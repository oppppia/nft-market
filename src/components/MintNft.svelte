<script lang="ts">
	import { contract, type TAccountInfo } from '$lib/web3';
	import Button from './Button.svelte';
	import notifications from '$lib/notifications';

	const { account }: { account: TAccountInfo } = $props();

	let nftName = $state('');

	async function onMint() {
		try {
			const txHash = await contract.methods.mintCommonNft(nftName).send({
				from: account.address,
				gas: '6721965'
			});

			notifications.add('success', 'NFT minted', `Tx hash ${txHash.transactionHash}`);
		} catch (err) {
			console.error(err);
			notifications.add('error', 'NFT minted error', `${err}`);
		} finally {
			nftName = '';
		}
	}
</script>

<div class="mx-auto flex max-w-md flex-col gap-4">
	<input
		type="text"
		placeholder="NFT Name"
		class="border-gray-300 rounded-lg border p-2"
		bind:value={nftName}
	/>
	<Button disabled={nftName === ''} onclick={onMint}>Mint NFT</Button>
</div>
