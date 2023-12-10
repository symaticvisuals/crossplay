import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
export const sendMessagetoOtherUser = async ({msg,walletProvider}) => {
    //meUSER / use wallet connect wallet
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    // Initialize wallet user
    // 'CONSTANTS.ENV.PROD' -> mainnet apps | 'CONSTANTS.ENV.STAGING' -> testnet apps
    const userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING });
    // Send a message to Bob
    const aliceMessagesBob = await userAlice.chat.send(toWalletAddress, {
    content: "Hello Bob!" + msg,
    type: "Text",
    });
}