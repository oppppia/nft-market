import { PUBLIC_CONTRACT_ADDRESS } from '$env/static/public';

export const contractAddress = PUBLIC_CONTRACT_ADDRESS;

export interface INftSaleData {
	isOnSale: boolean;
	price: bigint;
}

export interface INft {
	id: bigint;
	owner: string;
	name: string;
	isCollectible: boolean;
	collectionId?: bigint;
	imageHash: string;
	saleData: INftSaleData;
}

export interface ICollection {
	id: bigint;
	name: string;
	coverHash: string;
	owner: string;
	isOpen: boolean;
	nftIds: bigint[];
}

export interface IBid {
	bidder: string;
	amount: bigint;
}
