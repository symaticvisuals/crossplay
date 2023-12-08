import React, { useState } from 'react';
import Tetris from './components/Tetris';
import Landing from './components/landing/Landing';
import StartGame from './components/StartGame';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/dashboard/Home';
import Profile from './components/profile/Profile';
import { Provider } from 'react-redux';
import store from './api/store';
import { SnackbarProvider } from 'notistack';
import TetrisDemo from './components/TetrisDemo';
import {
  createWeb3Modal,
  defaultConfig,
} from '@web3modal/ethers5/react'

const projectId = '43349151a863ce091bab8f40d43d800f'
const chains = [
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
  },
  {
    chainId: 42161,
    name: 'Arbitrum',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc'
  }
]

const ethersConfig = defaultConfig({
  metadata: {
    name: 'Web3Modal',
    description: 'Web3Modal Laboratory',
    url: 'https://web3modal.com',
    icons: ['https://avatars.githubusercontent.com/u/37784886']
  },
  defaultChainId: 1,
  rpcUrl: 'https://cloudflare-eth.com'
})

// 3. Create modal
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true,
  themeMode: 'light',
  themeVariables: {
    '--w3m-color-mix': '#00DCFF',
    '--w3m-color-mix-strength': 20
  }
})





function App() {


  const [gameOver, setGameOver] = useState(false);
  const [gameIdInput, setGameIdInput] = useState('');
  const [userWallet, setUsetWallet] = useState(null);
  const [createdGame, setCreatedGame] = useState(false);

  return (
    <Provider store={store}>
      <SnackbarProvider />
      <BrowserRouter>
        <manageFunc.Provider value={{ gameOver, setGameOver, gameIdInput, setGameIdInput ,userWallet, setUsetWallet , createdGame, setCreatedGame}}>
          <Routes>
            <Route path="/app" element={<Tetris />} />
            <Route path="/demo" element={<TetrisDemo />} />
            <Route path="/start" element={<StartGame />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </manageFunc.Provider>
      </BrowserRouter>
    </Provider>
  );
}

export default App ;
