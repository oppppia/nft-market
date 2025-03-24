<script lang="ts">
	import type { INft } from '$lib/icontract';
	import Button from './Button.svelte';
	import notificationsStore from '$lib/notifications';
	import { contract, type TAccountInfo } from '$lib/web3';
	import { web3 } from '$lib/web3';
	import { X } from '@lucide/svelte';
	import { Api } from '$lib/api';

	interface INftCard {
		nft: INft;
		nftIdx: number;
		account: TAccountInfo;
		refreshNfts: () => void;
	}

	let { nft, nftIdx, account, refreshNfts }: INftCard = $props();

	let price: string = $state('');
	let nftImagePath: string | null = $state(null);

	let nftPlaceDialog: HTMLDialogElement | undefined = $state(undefined);
	let nftBuyDialog: HTMLDialogElement | undefined = $state(undefined);

	function onOpenNftPlaceDialog() {
		if (nftPlaceDialog === undefined) return;

		if (!nftPlaceDialog.open) nftPlaceDialog.showModal();
		else nftPlaceDialog.close();
	}

	function onOpenNftBuyDialog() {
		if (nftBuyDialog === undefined) return;

		if (!nftBuyDialog.open) nftBuyDialog.showModal();
		else nftBuyDialog.close();
	}

	async function getNftImage() {
		const resp = await fetch(`http://127.0.0.1:8080/api/nft/image/${nft.imageHash}`);

		const data = await resp.json();

		if (data) {
			const lastPathname = String(data.path).split('/').slice(-1);
			nftImagePath = `http://127.0.0.1:8080/uploads/${lastPathname}`;
		}
	}

	async function onPlace(id: number) {
		try {
			await Api.createEvent(account.address, 'Place on sale nft');

			const txHash = await contract.methods
				.placeNftOnSale(id, web3.utils.toWei(price, 'ether'))
				.send({
					from: account.address,
					gas: '6721965'
				});

			notificationsStore.add(
				'success',
				'Place NFT on sale successfully',
				`Tx hash: ${txHash.transactionHash}`
			);

			refreshNfts();
		} catch (err) {
			notificationsStore.add('error', 'Place NFT on sale error', `${err}`);
		} finally {
			price = '';
			nftPlaceDialog?.close();
		}
	}

	async function onBuy(id: number) {
		try {
			await Api.createEvent(account.address, 'Buy nft');

			const txHash = await contract.methods.buyNft(id).send({
				from: account.address,
				gas: '6721965',
				value: nft.saleData.price.toString()
			});

			notificationsStore.add(
				'success',
				'Buy NFT successfully',
				`Tx hash: ${txHash.transactionHash}`
			);

			refreshNfts();
		} catch (err) {
			notificationsStore.add('error', 'Buy NFT error', `${err}`);
		} finally {
			nftBuyDialog?.close();
		}
	}

	$effect(() => {
		getNftImage();
	});
</script>

<div class="h-full w-96 rounded-xl border border-primary px-4 py-4">
	<div>
		{#if nftImagePath}
			<img src={nftImagePath} aria-hidden="true" alt="NFT Image" class="h-[336px] w-full" />
		{/if}
	</div>
	<div class="flex flex-col items-center gap-2">
		<span class="text-2xl font-black text-white">{nft.name}</span>
		<p class="break-words font-thin text-white">
			Owner: <span class="text-sm font-bold">{nft.owner}</span>
		</p>
		<p class="text-left font-bold text-white">
			Collectible: <span
				class={`${nft.isCollectible ? 'text-collectableTrue' : 'text-collectableFalse'}`}
				>{nft.isCollectible}</span
			>
		</p>
		<span class="text-2xl font-black text-white">
			{#if nft.saleData.isOnSale}
				{web3.utils.fromWei(nft.saleData.price, 'ether')} ETH
			{/if}
		</span>
		{#if !nft.isCollectible}
			{#if nft.saleData.isOnSale && nft.owner !== account.address}
				<Button onclick={onOpenNftBuyDialog} class="w-full">Buy NFT</Button>
			{:else if !nft.saleData.isOnSale && nft.owner === account.address}
				<Button onclick={onOpenNftPlaceDialog} class="w-full">Place on sale</Button>
			{/if}
		{/if}
	</div>
</div>

<dialog bind:this={nftPlaceDialog} class="rounded-md p-6">
	<div class="relative">
		<div class="absolute right-4 cursor-pointer">
			<X onclick={() => nftPlaceDialog?.close()} />
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<p class="text-2xl font-bold">{nft.name}</p>
		<span class="text-xl font-thin">{nft.owner}</span>
		<input
			type="text"
			placeholder="Price"
			class="rounded-md border-2 px-2 py-2 outline-none focus:border-primary"
			bind:value={price}
		/>
		<Button disabled={price === ''} onclick={() => onPlace(nftIdx)}>Place on sale</Button>
	</div>
</dialog>

<dialog bind:this={nftBuyDialog} class="w-96 rounded-md p-6">
	<div class="absolute right-4 cursor-pointer">
		<X onclick={() => nftBuyDialog?.close()} />
	</div>
	<div class="flex flex-col gap-4">
		<p class="text-2xl font-semibold">
			NFT Name:
			<span class="text-xl font-bold">{nft.name}</span>
		</p>
		<p class="text-2xl font-semibold">
			Price: <span class="text-xl font-bold"
				>{web3.utils.fromWei(nft.saleData.price, 'ether')} ETH</span
			>
		</p>
		<Button onclick={() => onBuy(nftIdx)}>Buy</Button>
	</div>
</dialog>
