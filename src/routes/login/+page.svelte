<script lang="ts">
	import Button from '$components/Button.svelte';
	import notificationsStore from '$lib/notifications';
	import { ChartNoAxesGantt } from '@lucide/svelte';
	import { requestAccounts } from '$lib/web3';
	import { goto } from '$app/navigation';

	let login = $state(false);

	async function onAuth() {
		login = true;
		try {
			await requestAccounts();
			notificationsStore.add('success', 'Authorization', 'Successfully authorized');
			goto('/');
		} catch (err) {
			const message = (err as Error).message ?? 'Unknown error';
			notificationsStore.add('error', 'Failed to login', message);
		} finally {
			login = false;
		}
	}
</script>

<div class="flex min-h-screen justify-center bg-main">
	<div class="flex flex-col justify-center">
		<div class="bg-background-secondary flex flex-col gap-2 rounded px-32 py-20">
			<h1 class="text-center text-xl font-bold text-white">Login</h1>
			<Button
				class="flex items-center gap-2 transition-all hover:opacity-75"
				disabled={login}
				onclick={onAuth}
			>
				Login with MetaMask <ChartNoAxesGantt /></Button
			>
		</div>
	</div>
</div>
