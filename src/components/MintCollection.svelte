<script lang="ts">
	import { Api } from '$lib/api';
	import notificationsStore from '$lib/notifications';
	import { contract, type TAccountInfo } from '$lib/web3';
	import Button from './Button.svelte';
	import { X } from '@lucide/svelte';

	interface IMintCollection {
		account: TAccountInfo;
		refreshCollections: () => void;
		refreshNfts: () => void;
	}

	let { account, refreshCollections, refreshNfts }: IMintCollection = $props();

	let name = $state('');
	let nftCollectableName = $state('');
	let nftNames: string[] = $state([]);
	let files: File[] = $state([]);
	let file: File | null = $state(null);
	let selectedCollectionCover: string | null = $state(null);

	let mintNftDialog: HTMLDialogElement | undefined = $state(undefined);

	function onChangeCover(event: Event) {
		const input = event.currentTarget as HTMLInputElement;

		if (input.files && input.files.length > 0) {
			file = input.files[0];
			selectedCollectionCover = URL.createObjectURL(file);
		}
	}

	function onFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;

		if (input.files) {
			files = [...files, ...Array.from(input.files)];
		}
	}

	function onOpenMintNftDialog() {
		if (mintNftDialog === undefined) return;
		if (!mintNftDialog.open) mintNftDialog.showModal();
		else mintNftDialog.close();
	}

	function onAddNftInCollection() {
		if (!nftCollectableName || files.length === 0) return;
		nftNames.push(nftCollectableName);
		nftCollectableName = '';
	}

	async function onMintCollection() {
		if (nftNames.length === 0 || files.length === 0) return;

		const formData = new FormData();

		if (file) {
			formData.append('cover', file);
		}

		formData.append('name', name);
		formData.append('owner', account.address);
		formData.append('nftNames', JSON.stringify(nftNames));

		files.forEach((file, index) => {
			formData.append(`files[${index}]`, file);
		});

		const opts = {
			method: 'POST',
			route: 'api/collection/upload',
			body: formData
		};

		try {
			const data = await Api.fetchApi(opts);

			if (data) {
				await Api.createEvent(account.address, 'Mint collection');

				const tx = await contract.methods
					.mintCollection(name, nftNames, data.imageHashes, data.coverHash)
					.send({
						from: account.address,
						gas: '6721965'
					});

				notificationsStore.add(
					'success',
					'Mint collection successfully',
					`Tx hash: ${tx.transactionHash}`
				);

				refreshCollections();
				refreshNfts();
			}
		} catch (err) {
			console.error(err);
			notificationsStore.add('error', 'Mint collection error', `${err}`);
		} finally {
			name = '';
			file = null;
			files = [];
			nftNames = [];
		}
	}
</script>

<div class="mx-auto flex w-96 flex-col gap-2 p-8">
	<label
		for="file-upload"
		class="bg-gray-100 hover:bg-gray-200 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-primary p-6 text-white transition"
	>
		{#if selectedCollectionCover}
			<img
				src={selectedCollectionCover}
				aria-hidden="true"
				alt="uploaded-image"
				class="h-[336px] w-full rounded-lg"
			/>
		{:else}
			<span class="text-gray-500">Upload image</span>
		{/if}
		<input id="file-upload" type="file" class="hidden" onchange={onChangeCover} />
	</label>
	<input
		type="text"
		class="border-gray-300 rounded-lg border p-2"
		placeholder="Collection name"
		bind:value={name}
	/>
	<Button onclick={onOpenMintNftDialog}>Add NFT to Collection</Button>
	<Button disabled={nftNames.length === 0} onclick={onMintCollection}>Mint Collection</Button>
</div>

<dialog bind:this={mintNftDialog} class="rounded-lg">
	<div class="relative flex items-center">
		<div class="absolute inset-0 right-0 cursor-pointer">
			<X onclick={() => mintNftDialog?.close()} />
		</div>
	</div>
	<div class="flex flex-col gap-4 px-12 py-12">
		<h2 class="p-2 text-2xl font-black">Add NFT in collection</h2>
		<input type="file" onchange={onFileChange} multiple />
		<input
			type="text"
			placeholder="NFT Name"
			class="rounded-md border-2 px-2 py-1 outline-none focus:border-primary"
			bind:value={nftCollectableName}
		/>
		<ul class="flex flex-col gap-2">
			{#each nftNames as nftName, index}
				<li class="text-xl font-semibold">{nftName} - {files[index].name}</li>
			{/each}
		</ul>
		<Button
			class={`${nftCollectableName === '' || files.length === 0 ? 'opacity-80' : ''}`}
			disabled={nftCollectableName === '' || files.length === 0}
			onclick={onAddNftInCollection}>Add</Button
		>
	</div>
</dialog>
