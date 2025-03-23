export const contractAddress = '0xb598DB0b88d113B343CCdAbA75b29da68f7c7c8d';

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
	isOpen: boolean;
	nftIds: bigint[];
}

export interface IBid {
	bidder: string;
	amount: bigint;
}
