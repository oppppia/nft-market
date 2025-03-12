<script lang="ts">
	import type { ICollection } from '$lib/icontract';
	import CollectionCard from './CollectionCard.svelte';

	const { collections }: { collections: ICollection[] } = $props();
</script>

<div class="flex items-center justify-center">
	{#if collections.length > 0}
		{#each collections as collection}
			<div class="inline-grid grid-cols-3 gap-4">
				<CollectionCard {collection} />
			</div>
		{/each}
	{:else}
		<span class="mx-auto text-2xl font-bold text-white">You haven't collections</span>
	{/if}
</div>
