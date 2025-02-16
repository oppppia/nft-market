<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const props: HTMLButtonAttributes = $props();
</script>

<button {...props} class="rounded-md bg-primary px-4 py-2 font-bold text-white {props.class || ''}">
	<slot />
</button>
