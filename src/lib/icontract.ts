export const contractAddress = '0x4CC60283DDF6363E39B6aA54D16a63B12613D42d';

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

export interface IAuction {
	startPrice: bigint;
	maxPrice: bigint;
	bids: IBid[];
}
