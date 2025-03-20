export const contractAddress = '0xB0667E427F503B8E89541a5F0791e3c82ee6e79a';

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
	isOpen: boolean;
	nftIds: bigint[];
}

export interface IBid {
	bidder: string;
	amount: bigint;
}
