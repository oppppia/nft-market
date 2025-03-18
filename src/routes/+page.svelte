<script lang="ts">
	import { contract, getAccounts, type TAccountInfo } from '$lib/web3';
	import ArticleCard from '../components/ArticleCard.svelte';
	import AccountSelector from '$components/AccountSelector.svelte';
	import Header from '../components/Header.svelte';
	import MintNft from '../components/MintNft.svelte';
	import NftList from '$components/NftList.svelte';
	import MintCollection from '$components/MintCollection.svelte';
	import CollectionList from '$components/CollectionList.svelte';

	const accounts = getAccounts();
	const tabs = ['Mint NFT', 'NFTs', 'Mint NFT collection', 'NFT Collections'];
	let activeTab = $state(tabs[0]);
	let selectedAccount: TAccountInfo | undefined = $state(undefined);

	async function getNfts() {
		const nfts = await contract.methods.getNfts().call();

		return nfts;
	}

	async function getCollections() {
		const collections = await contract.methods.getCollections().call();

		return collections;
	}
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
			<MintNft account={selectedAccount} />
		{/if}
	{:else if activeTab === 'NFTs'}
		<ArticleCard primaryName="YOUR" secondaryName="NFTs"></ArticleCard>
		{#if selectedAccount}
			{#await getNfts()}
				<span>Loading...</span>
			{:then nfts}
				<NftList {nfts} account={selectedAccount} />
			{/await}
		{/if}
	{:else if activeTab === 'Mint NFT collection'}
		<ArticleCard primaryName="MINT" secondaryName="NFT COLLECTION"></ArticleCard>
		{#if selectedAccount !== undefined}
			<MintCollection nfts={[]} account={selectedAccount} />
		{/if}
	{:else if activeTab === 'NFT Collections'}
		<ArticleCard primaryName="YOUR" secondaryName="NFTs COLLECTIONS"></ArticleCard>
		{#await getCollections()}
			<span>Loading collections...</span>
		{:then collections}
			<CollectionList {collections} />
		{/await}
	{/if}
</main>
