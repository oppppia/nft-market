<script lang="ts">
	import { web3 } from '$lib/web3';
	import { type TAccountInfo } from '$lib/web3';

	interface IAccountSelector {
		accounts: TAccountInfo[];
		accountChange: (account: TAccountInfo) => void;
	}

	const { accounts, accountChange }: IAccountSelector = $props();

	let selectedAccount: TAccountInfo = $state(accounts[0]);

	function setAccount(address: string) {
		const account = accounts.find((item) => item.address === address);

		if (!account) return;

		selectedAccount = account;

		accountChange(account);
	}
</script>

<div class="flex flex-col items-center gap-3">
	<select class="rounded-md px-4 py-2">
		{#each accounts as account}
			<option onclick={() => setAccount(account.address)}>{account.address}</option>
		{/each}
	</select>
	<div class="flex flex-col items-center gap-2 px-4 text-lg font-bold text-white">
		<p class="break-words">Current account: {selectedAccount.address}</p>
		<span>Balance: {web3.utils.fromWei(selectedAccount.balance, 'ether')} ETH</span>
	</div>
</div>
