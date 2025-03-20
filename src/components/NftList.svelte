<script lang="ts">
	import type { INft } from '$lib/icontract';
	import type { TAccountInfo } from '$lib/web3';
	import NftCard from './NftCard.svelte';

	interface INftList {
		nfts: INft[];
		account: TAccountInfo;
	}

	const { nfts, account }: INftList = $props();

	let isFilterActive = $state(false);
	let filteredNfts: INft[] = $state([]);

	const tabs = ['My NFTs', 'Users NFTs'];
	let activeTab = $state(tabs[0]);

	$effect(() => {
		if (isFilterActive) {
			filteredNfts = nfts.filter((nft) => nft.saleData.isOnSale === true);
		}

		if (activeTab === 'My NFTs') {
			filteredNfts = nfts.filter((nft) => nft.owner === account.address);
		} else if (activeTab === 'Users NFTs') {
			filteredNfts = nfts.filter((nft) => nft.owner !== account.address);
		}
	});
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center justify-center gap-5">
		<div>
			<select class="rounded-md px-12 py-2">
				{#each tabs as tab}
					<option onclick={() => (activeTab = tab)}>{tab}</option>
				{/each}
			</select>
		</div>
		<div class="flex justify-center gap-3 text-xl font-bold text-white">
			<input
				class="sales-filter"
				type="checkbox"
				onclick={() => (isFilterActive = !isFilterActive)}
			/>
			<span>Sales NFTs</span>
		</div>
	</div>
	<div class="mx-auto inline-grid grid-cols-3 gap-24 px-16 py-8">
		{#if nfts.length > 0}
			{#each filteredNfts as nft, idx}
				<NftCard {nft} nftIdx={idx} {account} />
			{/each}
		{:else if activeTab === tabs[1]}
			<span class="mx-auto text-2xl font-bold text-white">Users NFT's not found</span>
		{:else}
			<span class="mx-auto text-2xl font-bold text-white">You haven't NFTs</span>
		{/if}
	</div>
</div>

<style>
	.sales-filter {
		accent-color: #2bd7b1;
		width: 24px;
		height: 24px;
	}
</style>
