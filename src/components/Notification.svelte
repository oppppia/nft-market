<script lang="ts">
	import type { TNotification } from '$lib/notifications';

	const { type, title, message }: { type: TNotification; title: string; message: string } =
		$props();
</script>

<div
	class="fixed right-0 top-0 rounded-md bg-{type} h-auto max-w-lg border-primary transition-colors"
>
	<div class="relative">
		<p class="text-2xl font-black text-white">{title}</p>
	</div>
	<div class="relative">
		<span class="text-xl font-black">{message}</span>
	</div>
</div>

<style>
	.bg-success {
		background: #45a78c;
	}

	.bg-error {
		background: red;
	}

	.bg-info {
		background: gray;
	}
</style>
