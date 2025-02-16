<script lang="ts">
	import ArticleCard from '../components/ArticleCard.svelte';
	import AccountSelector from '$components/AccountSelector.svelte';
	import Header from '../components/Header.svelte';
	import MintNft from '../components/MintNft.svelte';
	import { contract, getAccounts, type TAccountInfo } from '$lib/web3';
	import NftList from '$components/NftList.svelte';

	const accounts = getAccounts();
	const tabs = ['Mint NFT', 'NFTs', 'NFT Collections', 'Auction NFT'];
	let activeTab = $state(tabs[0]);
	let selectedAccount: TAccountInfo | undefined = $state(undefined);

	async function getNfts() {
		const nfts = await contract.methods.getNfts().call();

		return nfts;
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
	{:else if activeTab === 'NFT Collections'}
		<ArticleCard primaryName="YOUR" secondaryName="NFT COLLECTIONS"></ArticleCard>
	{:else if activeTab === 'Auction NFT'}
		<ArticleCard primaryName="START AUCTION" secondaryName="NFT NOW"></ArticleCard>
	{/if}
</main>
