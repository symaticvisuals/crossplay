const ArbitrumMainnet = {
    chainId: 42161,
    name: 'Arbitrum Mainnet',
    currency: 'ETH',
    explorerUrl: 'https://rinkeby-explorer.arbitrum.io',
    rpcUrl: 'https://arb-mainnet.g.alchemy.com/v2/demo'
  };
const ArbitrumTestnet = {
    chainId: 421614,
    name: 'Arbitrum Testnet sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.arbiscan.io/',
    rpcUrl: 'https://arbitrum-sepolia.blockpi.network/v1/rpc/public'
  };
  
  const BaseSepoliaTestnet = {
    chainId: 84532, 
    name: 'Base Sepolia Testnet',
    currency: 'SEPOLIA',
    explorerUrl: 'https://explorer.basesepolia.net',
    rpcUrl: 'https://rpc.basesepolia.net'
  };
  
  const EthereumMainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  };
  
  const EthereumTestnet = {
    chainId: 3,
    name: 'Ethereum Testnet (Ropsten)',
    currency: 'ETH',
    explorerUrl: 'https://ropsten.etherscan.io',
    rpcUrl: 'https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID'
  };
  
  const MantleTestnet = {
    chainId: 5001, 
    name: 'Mantle Testnet',
    currency: 'MNTL',
    explorerUrl: 'https://explorer.mantletestnet.net',
    rpcUrl: 'https://rpc.mantletestnet.net'
  };
  
  const PolygonZkEVMTestnet = {
    chainId: 1442,
    name: 'Polygon ZkEVM Testnet',
    currency: 'ETH',
    explorerUrl: 'https://zkscan.io/polygon',
    rpcUrl: 'https://rpc.public.zkevm-test.net/'
  };
  
  const zkSyncScrollTestnet = {
    chainId: 534351,
    name: 'zkSync Scroll Testnet',
    currency: 'ETH',
    explorerUrl: 'https://zkscan.io/scroll',
    rpcUrl: 'https://sepolia-rpc.scroll.io'
  };
  
  export { ArbitrumTestnet,
    ArbitrumMainnet,
    BaseSepoliaTestnet,
    EthereumMainnet,
    EthereumTestnet,
    MantleTestnet,
    PolygonZkEVMTestnet,
    zkSyncScrollTestnet, };
  