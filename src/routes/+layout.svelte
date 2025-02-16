<script lang="ts">
	import Notification from '$components/Notification.svelte';
	import { notifications } from '$lib/notifications';
	import '../app.css';
	let { children } = $props();
</script>

<div>
	{#each $notifications as notification (notification.id)}
		<Notification
			type={notification.type}
			title={notification.title}
			message={notification.message}
		/>
	{/each}
</div>

{@render children()}
