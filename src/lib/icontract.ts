export const contractAddress = '0xFA4513f20D6e3Fc669d5464659776FF159428C86';

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

export interface IAuction {
	startPrice: bigint;
	maxPrice: bigint;
	bids: IBid[];
}
