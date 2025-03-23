<script lang="ts">
	import { contract, getAccounts, type TAccountInfo } from '$lib/web3';
	import ArticleCard from '../components/ArticleCard.svelte';
	import AccountSelector from '$components/AccountSelector.svelte';
	import Header from '../components/Header.svelte';
	import MintNft from '../components/MintNft.svelte';
	import NftList from '$components/NftList.svelte';
	import MintCollection from '$components/MintCollection.svelte';
	import CollectionList from '$components/CollectionList.svelte';
	import { Api } from '$lib/api';
	import TransactionList from '$components/TransactionList.svelte';
	import type { ICollection, INft } from '$lib/icontract';

	const accounts = getAccounts();
	const tabs = ['Mint NFT', 'NFTs', 'Mint NFT collection', 'NFT Collections', 'Transactions'];
	let activeTab = $state(tabs[0]);
	let selectedAccount: TAccountInfo | undefined = $state(undefined);
	let nfts: INft[] = $state([]);
	let collections: ICollection[] = $state([]);

	async function refreshNfts() {
		nfts = await contract.methods.getNfts().call();
	}

	async function refreshCollections() {
		collections = await contract.methods.getCollections().call();
	}

	async function getTransactions() {
		const opts = {
			method: 'POST',
			route: '/api/transactions/get',
			body: {
				address: selectedAccount
			}
		};

		const data = await Api.fetchApi(opts);

		return data.transactions;
	}

	$effect(() => {
		refreshNfts();
		refreshCollections();
	});
</script>

<main class="flex min-h-screen flex-col gap-4 bg-main">
	<Header {tabs} bind:activeTab></Header>
	{#await accounts then accounts}
		<AccountSelector
			{accounts}
			accountChange={(account) => {
				selectedAccount = account;
			}}
		/>
	{/await}
	{#if activeTab === 'Mint NFT'}
		<ArticleCard primaryName="MINT" secondaryName="NFT NOW"></ArticleCard>
		{#if selectedAccount !== undefined}
			<MintNft account={selectedAccount} {refreshNfts} />
		{/if}
	{:else if activeTab === 'NFTs'}
		<ArticleCard primaryName="YOUR" secondaryName="NFTs"></ArticleCard>
		{#if selectedAccount}
			<NftList {nfts} account={selectedAccount} {refreshNfts} />
		{/if}
	{:else if activeTab === 'Mint NFT collection'}
		<ArticleCard primaryName="MINT" secondaryName="NFT COLLECTION"></ArticleCard>
		{#if selectedAccount !== undefined}
			<MintCollection account={selectedAccount} {refreshCollections} />
		{/if}
	{:else if activeTab === 'NFT Collections'}
		<ArticleCard primaryName="YOUR" secondaryName="NFTs COLLECTIONS"></ArticleCard>
		{#if selectedAccount}
			<CollectionList {collections} {nfts} account={selectedAccount} {refreshNfts} />
		{/if}
	{:else if activeTab === 'Transactions'}
		<ArticleCard primaryName="YOUR" secondaryName="TRANSACTIONS" />
		{#await getTransactions()}
			<span>Loading...</span>
		{:then transactions}
			<TransactionList {transactions} />
		{/await}
	{/if}
</main>
