<script lang="ts">
	import notificationsStore from '$lib/notifications';
	import { contract, type TAccountInfo } from '$lib/web3';
	import Button from './Button.svelte';
	import { X } from '@lucide/svelte';

	let { account }: { account: TAccountInfo } = $props();

	let name = $state('');
	let nftCollectableName = $state('');
	let nftNames: string[] = $state([]);

	let mintNftDialog: HTMLDialogElement | undefined = $state(undefined);

	function onOpenMintNftDialog() {
		if (mintNftDialog === undefined) return;

		if (!mintNftDialog.open) mintNftDialog.showModal();
		else mintNftDialog.close();
	}

	function onAddNftInCollection() {
		nftNames.push(nftCollectableName);

		nftCollectableName = '';
	}

	async function onMintCollection() {
		try {
			const tx = await contract.methods.mintCollection(name, nftNames).send({
				from: account.address,
				gas: '6721965'
			});

			notificationsStore.add(
				'success',
				'Mint collection successfully',
				`Tx hash: ${tx.transactionHash}`
			);
		} catch (err) {
			console.error(err);
			notificationsStore.add('error', 'Mint collection error', `${err}`);
		} finally {
			name = '';
		}
	}
</script>

<div class="mx-auto flex max-w-md flex-col gap-2">
	<input
		type="text"
		class="border-gray-300 rounded-lg border p-2"
		placeholder="Collection name"
		bind:value={name}
	/>
	<Button onclick={onOpenMintNftDialog}>Add nft in collection</Button>
	<Button disabled={nftNames.length === 0} onclick={onMintCollection}>Mint collection</Button>
</div>

<dialog bind:this={mintNftDialog} class="relative rounded-lg bg-secondary">
	<div class="relative flex items-center">
		<div class="absolute right-4 cursor-pointer">
			<X onclick={() => mintNftDialog?.close()} />
		</div>
		<h2 class="p-2 text-2xl font-black text-white">Add NFT in collection</h2>
	</div>
	<div class="flex flex-col gap-4 px-12 py-12">
		<input
			type="text"
			placeholder="NFT collectable name"
			class="px-2 py-1 outline-none"
			bind:value={nftCollectableName}
		/>
		<ul class="flex flex-col gap-2">
			{#each nftNames as nftName}
				<li class="text-xl font-semibold text-white">{nftName}</li>
			{/each}
		</ul>
		<Button
			class={`${nftCollectableName === '' ? 'opacity-50' : ''}`}
			disabled={nftCollectableName === ''}
			onclick={onAddNftInCollection}>Add</Button
		>
	</div>
</dialog>
