<script lang="ts">
	import type { ICollection, INft } from '$lib/icontract';
	import type { TAccountInfo } from '$lib/web3';
	import CollectionCard from './CollectionCard.svelte';

	interface ICollectionList {
		collections: ICollection[];
		nfts: INft[];
		account: TAccountInfo;
		refreshNfts: () => void;
	}

	const { collections, nfts, account, refreshNfts }: ICollectionList = $props();
</script>

<div class="flex items-center justify-center">
	{#if collections.length > 0}
		{#each collections as collection}
			<div class="inline-grid grid-cols-3 gap-4">
				<CollectionCard {collection} {nfts} {account} {refreshNfts} />
			</div>
		{/each}
	{:else}
		<span class="mx-auto text-2xl font-bold text-white">You haven't collections</span>
	{/if}
</div>
