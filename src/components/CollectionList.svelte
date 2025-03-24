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

	let { collections, nfts, account, refreshNfts }: ICollectionList = $props();

	const tabs = ['My collections', 'Users collections'];
	let activeTab = $state(tabs[0]);

	const filteredCollections = $derived(
		activeTab === tabs[0]
			? collections.filter((collection) => collection.owner === account.address)
			: collections.filter((collection) => collection.owner !== account.address)
	);
</script>

<div class="flex flex-col items-center justify-center gap-4 p-8">
	<div class="flex items-center justify-center gap-5">
		<select class="rounded-md px-12 py-2" bind:value={activeTab}>
			{#each tabs as tab}
				<option value={tab}>{tab}</option>
			{/each}
		</select>
	</div>
	{#if filteredCollections.length > 0}
		<div class="inline-grid grid-cols-3 gap-4">
			{#each filteredCollections as collection}
				<CollectionCard {collection} {nfts} {account} {refreshNfts} />
			{/each}
		</div>
	{:else}
		<span class="mx-auto text-2xl font-bold text-white">
			{activeTab === tabs[0] ? "You don't have any collections" : 'No public collections available'}
		</span>
	{/if}
</div>
