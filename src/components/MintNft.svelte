<script lang="ts">
	import { contract, type TAccountInfo } from '$lib/web3';
	import Button from './Button.svelte';
	import notifications from '$lib/notifications';
	import { Api } from '$lib/api';

	const { account }: { account: TAccountInfo } = $props();

	let nftName = $state('');
	let file: File | null = $state(null);

	function onFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;

		if (input.files && input.files.length > 0) {
			file = input.files[0];
		}
	}

	async function onMint() {
		try {
			const txHash = await contract.methods.mintCommonNft(nftName).send({
				from: account.address,
				gas: '6721965'
			});

			if (file) {
				const formData = new FormData();
				formData.append('file', file);
				formData.append('name', nftName);
				formData.append('owner', account.address);

				const opts = {
					method: 'POST',
					route: 'api/nft/save',
					body: formData
				};

				await Api.fetchApi(opts);
			}

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
	<input type="file" onchange={onFileChange} />
	<input
		type="text"
		placeholder="NFT Name"
		class="border-gray-300 rounded-lg border p-2"
		bind:value={nftName}
	/>
	<Button disabled={nftName === ''} onclick={onMint}>Mint NFT</Button>
</div>
