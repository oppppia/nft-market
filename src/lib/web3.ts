import Web3 from 'web3';
import abi from './abi';
import { contractAddress } from './icontract';

export const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545'));
export const contract = new web3.eth.Contract(abi, contractAddress);

export type TAccountInfo = {
	address: string;
	balance: bigint;
};

export async function getAccounts(): Promise<TAccountInfo[]> {
	const accounts = await web3.eth.getAccounts();

	const accountsWithBalance = accounts.map(async (account) => {
		const balance = await web3.eth.getBalance(account);

		return { address: account, balance };
	});

	return await Promise.all(accountsWithBalance);
}
