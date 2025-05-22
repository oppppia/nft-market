<script lang="ts">
	import type { INft } from '$lib/icontract';
	import type { TAccountInfo } from '$lib/web3';
	import NftCard from './NftCard.svelte';

	interface INftList {
		nfts: INft[];
		account: TAccountInfo;
		refreshNfts: () => void;
	}

	let { nfts: originalNfts, account, refreshNfts }: INftList = $props();

	const tabs = ['My NFTs', 'Users NFTs'];
	let activeTab = $state(tabs[0]);

	const filteredNfts = $derived(
		activeTab === tabs[0]
			? originalNfts.filter((nft) => nft.owner === account.address)
			: originalNfts.filter((nft) => nft.owner !== account.address)
	);
</script>

<div class="flex flex-col gap-4">
	<div class="flex items-center justify-center gap-5">
		<div>
			<select class="rounded-md px-12 py-2" bind:value={activeTab}>
				{#each tabs as tab}
					<option value={tab}>{tab}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="mx-auto inline-grid grid-cols-3 gap-24 px-16 py-8">
		{#if filteredNfts.length > 0}
			{#each filteredNfts as nft, idx}
				<NftCard {nft} nftIdx={idx} {account} {refreshNfts} />
			{/each}
		{:else}
			<p class="mx-auto text-xl font-bold text-white">
				{activeTab === tabs[0] ? "You haven't NFTs" : "Other users haven't NFT's"}
			</p>
		{/if}
	</div>
</div>
