<script lang="ts">
	import type { ICollection, INft } from '$lib/icontract';
	import type { TAccountInfo } from '$lib/web3';
	import Button from './Button.svelte';
	import NftCard from './NftCard.svelte';
	import { X } from '@lucide/svelte';

	interface ICollectionCard {
		collection: ICollection;
		nfts: INft[];
		account: TAccountInfo;
		refreshNfts: () => void;
	}

	const { collection, nfts, account, refreshNfts }: ICollectionCard = $props();

	let collectionDialog: HTMLDialogElement | undefined = $state(undefined);

	let collectionCoverPath: string | undefined = $state(undefined);

	async function getCollectionCover() {
		const resp = await fetch(`http://127.0.0.1:8080/api/collection/cover/${collection.coverHash}`);

		const data = await resp.json();

		if (data) {
			const lastPathname = String(data.path).split('/').slice(-1);
			collectionCoverPath = `http://127.0.0.1:8080/uploads/${lastPathname}`;
		}
	}

	function onShowCollection() {
		if (collectionDialog === undefined) return;

		if (!collectionDialog.open) collectionDialog.showModal();
		else collectionDialog.close();
	}

	let collectionNfts: INft[] = $derived(
		nfts.filter((_, idx) => collection.nftIds.includes(BigInt(idx)))
	);

	$effect(() => {
		getCollectionCover();
	});
</script>

<div class="flex w-96 flex-col gap-4 rounded-md border-2 border-primary px-4 py-4">
	<div>
		{#if collectionCoverPath}
			<img src={collectionCoverPath} aria-hidden="true" alt="NFT Image" class="h-[336px] w-full" />
		{/if}
	</div>
	<span class="text-2xl font-bold text-white">{collection.name}</span>
	<Button onclick={onShowCollection}>Show collection</Button>
</div>

<dialog bind:this={collectionDialog} class="border-2 border-primary bg-secondary p-6">
	<div class="relative">
		<div class="absolute right-4 cursor-pointer">
			<X onclick={() => collectionDialog?.close()} />
		</div>
	</div>
	<div class="grid grid-cols-3 gap-4">
		{#each collectionNfts as nft, idx}
			<NftCard {nft} nftIdx={idx} {account} {refreshNfts} />
		{/each}
	</div>
</dialog>
