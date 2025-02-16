<script lang="ts">
	import type { ICollection } from '$lib/icontract';

	const { collections }: { collections: ICollection[] } = $props();
	console.log(collections);
</script>

<div>
	{#each collections as collection}
		<div>
			<span>{collection.name}</span>
		</div>
	{/each}
</div>
