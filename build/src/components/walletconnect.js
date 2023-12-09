import { useWeb3Modal } from '@web3modal/ethers/react'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { ethers } from 'ethers'
// import { EthereumMainnet, PolygonZkSyncTestnet } from '../common/config'
import { ArbitrumTestnet,
    ArbitrumMainnet,
    BaseSepoliaTestnet,
    EthereumMainnet,
    EthereumTestnet,
    MantleTestnet,
    PolygonZkEVMTestnet,
    zkSyncScrollTestnet, } from '../common/config'

const projectId = '43349151a863ce091bab8f40d43d800f'

// 3. Create modal
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [
    ArbitrumTestnet,
    ArbitrumMainnet,
    BaseSepoliaTestnet,
    EthereumMainnet,
    EthereumTestnet,
    MantleTestnet,
    PolygonZkEVMTestnet,
    zkSyncScrollTestnet,],
  projectId
})

export const { open } = useWeb3Modal()

// Function to connect to MetaMask


export default function ConnectButton() {
  // 4. Use modal hook

  return (
    <>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
    </>
  )
}