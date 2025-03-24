<script lang="ts">
	import { Api } from '$lib/api';
	import type { TAccountInfo } from '$lib/web3';
	import TransactionCard from './TransactionCard.svelte';

	const { account }: { account: TAccountInfo } = $props();

	async function getTransactions() {
		const opts = {
			method: 'POST',
			route: 'api/event/get',
			body: JSON.stringify({
				address: account.address
			}),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		};

		const data = await Api.fetchApi(opts);

		return data.events;
	}
</script>

<div class="mx-auto flex flex-col gap-6 p-8">
	{#await getTransactions()}
		<p>Loading transactions...</p>
	{:then transactions}
		{#if transactions.length > 0}
			{#each transactions as transaction}
				<TransactionCard {transaction} />
			{/each}
		{/if}
	{/await}
</div>
