<script lang="ts">
	import type { INft } from '$lib/icontract';
	import Button from './Button.svelte';
	import nftIcon from '../images/nft.png';
	import notificationsStore from '$lib/notifications';
	import { contract, type TAccountInfo } from '$lib/web3';
	import ModalSkeleton from './ModalSkeleton.svelte';
	import { onClose } from '$lib/index';

	interface INftCard {
		nft: INft;
		nftIdx: number;
		account: TAccountInfo;
	}

	let { nft, nftIdx, account }: INftCard = $props();

	let price: bigint = $state(0n);
	let isOpen = $state(false);
	let isOpenBuy = $state(false);

	async function onPlaceNftOnSale(id: number) {
		try {
			const txHash = await contract.methods.placeNftOnSale(id, price).send({
				from: account.address,
				gas: '6721965'
			});

			notificationsStore.add(
				'success',
				'Place NFT on sale',
				`Nft on sale ${txHash.transactionHash}`
			);
		} catch (err) {
			notificationsStore.add('error', 'Place NFT on sale', `Error: ${err}`);
		} finally {
			price = 0n;
			isOpen = false;
		}
	}

	async function buyNft(id: number) {
		try {
			const txHash = await contract.methods.buyNft(id).send({
				from: account.address,
				gas: '6721965',
				value: nft.saleData.price.toString()
			});

			notificationsStore.add(
				'success',
				'Buy NFT',
				`Successfully buy NFT ${txHash.transactionHash}`
			);
		} catch (err) {
			notificationsStore.add('error', 'Buy NFT', `Error ${err}`);
		}
	}
</script>

<div class="h-full w-96 rounded-xl border border-primary px-4 py-4">
	<div>
		<img src={nftIcon} alt="nft-icon" class=" h-[336px] w-full" />
	</div>
	<div class="flex flex-col items-center gap-2">
		<span class="text-2xl font-black text-white">{nft.name}</span>
		<span class="text-2xl font-black text-white">
			{#if nft.saleData.isOnSale}
				{nft.saleData.price} ETH
			{/if}
		</span>
		{#if nft.saleData.isOnSale && nft.owner !== account.address}
			<Button onclick={() => (isOpenBuy = !isOpenBuy)} class="w-full">Buy NFT</Button>
		{:else if !nft.saleData.isOnSale && nft.owner === account.address}
			<Button onclick={() => (isOpen = !isOpen)} class="w-full">Place on sale</Button>
		{/if}
	</div>
</div>

<ModalSkeleton {isOpen} onClose={() => onClose(isOpen)}>
	<div class="flex flex-col justify-center gap-3 text-2xl text-white">
		<p>NFT: <span class="font-black">{nft.name}</span></p>
		<p>OWNER: <span class="font-black">{nft.owner}</span></p>
	</div>
	<div class="flex flex-col gap-4">
		<input type="text" placeholder="Price" bind:value={price} />
		<Button onclick={() => onPlaceNftOnSale(nftIdx)}>Sale</Button>
	</div>
</ModalSkeleton>

<ModalSkeleton isOpen={isOpenBuy} onClose={() => onClose(isOpenBuy)}>
	<div class="flex flex-col justify-center gap-3 text-2xl text-white">
		<p>NFT: <span class="font-black">{nft.name}</span></p>
		<p>OWNER: <span class="font-black">{nft.owner}</span></p>
		<p>PRICE: {nft.saleData.price} ETH</p>
	</div>
	<Button onclick={() => buyNft(nftIdx)}>Buy</Button>
</ModalSkeleton>
