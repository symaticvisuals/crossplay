import { ethers } from 'ethers';

import { BrowserProvider } from 'ethers'
import { useWeb3ModalProvider } from '@web3modal/ethers/react'
import { contractABI } from './ABI';


// start game
export const createGame = async (
    betAmount,
    gameID,
    walletProvider,
    contractAddress, 
) => {
    try {
        const provider = new BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const transaction = await contract.startGame(ethers.parseEther(betAmount.toString()), 0, gameID, { value: ethers.parseEther(betAmount.toString()) });
        
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
    walletProvider, // Ethereum provider
    contractAddress, // address of the deployed contract
) => {
    try {
        const provider = new BrowserProvider(walletProvider);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const transaction = await contract.removeGame(gameID);
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
