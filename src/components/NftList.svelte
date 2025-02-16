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

	$effect(() => {
		if (isFilterActive) {
			filteredNfts = nfts.filter((nft) => nft.saleData.isOnSale === true);
		} else {
			filteredNfts = [...nfts];
		}
	});
</script>

<div class="flex flex-col">
	<div class="flex gap-3 text-xl font-bold text-white">
		<input
			class="sales-filter"
			type="checkbox"
			onclick={() => (isFilterActive = !isFilterActive)}
		/>
		<span>Sales NFTs</span>
	</div>
	<div class="mx-auto inline-grid grid-cols-3 gap-24 px-16 py-8">
		{#if nfts.length > 0}
			{#each filteredNfts as nft, idx}
				<NftCard {nft} nftIdx={idx} {account} />
			{/each}
		{:else}
			<span class="text-3xl font-semibold text-white">You haven't NFTs</span>
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
