<script lang="ts">
	interface ITransaction {
		eventCreator: string;
		eventName: string;
		createdAt: string;
	}

	const { transaction }: { transaction: ITransaction } = $props();

	function truncateDate(date: string) {
		const [year, time] = date.split('T');

		return `Date: ${year} ${time.slice(0, 8)}`;
	}
</script>

<div class="rounded-md border-2 border-primary px-4 py-2 text-white">
	<h1 class="font-bold">Event: {transaction.eventName}</h1>
	<p>From account: {transaction.eventCreator}</p>
	<p>{truncateDate(new Date(transaction.createdAt).toISOString())}</p>
</div>
