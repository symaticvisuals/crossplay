import { ethers } from 'ethers';

import { BrowserProvider } from 'ethers'
import { useWeb3ModalProvider } from '@web3modal/ethers/react'
import { contractABI } from './ABI';

// start game
export const createGame = async (
    betAmount,
    gameID,
    contractAddress, // address of the deployed contract
) => {
    try {
        const { walletProvider } = useWeb3ModalProvider();
        const provider = new BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const transaction = await contract.startGame(ethers.utils.parseEther(betAmount.toString()), 0, gameID, { value: ethers.utils.parseEther(betAmount.toString()) });
        
        await transaction;

        return {
            success: true,
            transaction,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error,
        };
    }
};

// removeGame
export const removeGame = async (
    gameID,
    provider, // Ethereum provider
    contractAddress, // address of the deployed contract
) => {
    try {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const transaction = await contract.removeGame(gameID);
        await transaction.wait();

        return {
            success: true,
            transaction,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            error,
        };
    }
};
