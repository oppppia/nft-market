<script lang="ts">
	import { contract, type TAccountInfo } from '$lib/web3';
	import Button from './Button.svelte';
	import { notificationsStore } from '$lib/notifications';

	interface IMintNft {
		account: TAccountInfo;
		refreshNfts: () => void;
	}

	const { account, refreshNfts }: IMintNft = $props();

	let nftName = $state('');
	let file: File | null = $state(null);
	let selectedImage: string | null = $state(null);

	function onChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			file = input.files[0];
			selectedImage = URL.createObjectURL(file);
		}
	}

	async function onMint() {
		try {
			const txHash = await contract.methods.mintCommonNft(nftName).send({
				from: account.address,
				gas: '6721965'
			});

			notificationsStore.add('success', 'NFT minted', `Tx hash ${txHash.transactionHash}`);

			refreshNfts();
		} catch (err) {
			console.error(err);
			notificationsStore.add('error', 'NFT minted error', `${err}`);
		} finally {
			nftName = '';
			selectedImage = null;
		}
	}
</script>

<div class="mx-auto flex w-96 flex-col gap-4 p-8">
	<label
		for="file-upload"
		class="bg-gray-100 hover:bg-gray-200 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-primary p-6 text-white transition"
	>
		{#if selectedImage}
			<img
				src={selectedImage}
				aria-hidden="true"
				alt="uploaded-image"
				class="h-[336px] w-full rounded-lg"
			/>
		{:else}
			<span class="text-gray-500">Upload image</span>
		{/if}
		<input id="file-upload" type="file" class="hidden" onchange={onChange} />
	</label>
	<input
		type="text"
		placeholder="NFT Name"
		class="border-gray-300 rounded-lg border p-2"
		bind:value={nftName}
	/>
	<Button disabled={nftName === ''} onclick={onMint}>Mint NFT</Button>
</div>
