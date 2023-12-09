import { useContext, useEffect, useState, useCallback } from "react";
import {
  useWeb3ModalState,
  useWeb3ModalAccount
} from '@web3modal/ethers/react'
import styles from "./scss/Navbar.module.scss";
import teztileLogo from "../../img/tezTile.png";
import { useDispatch } from "react-redux";
import { connectSocketThunk } from "../../api/socketSlice";
import { useNavigate } from "react-router-dom";
import { manageFunc } from "../../App";
import { open } from "../wallet";
import { IoIosWallet, IoIosSwap } from 'react-icons/io'; // Import other icons


function Navbar() {
  const [walletButtonText, setWalletButtonText] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const { userWallet, setUserWallet } = useContext(manageFunc);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoClick = () => navigate("/demonew");
  const handleProfileClick = () => navigate("/profile");

  const selectNetwork = useCallback(async () => {
    // Implementation of wallet connection logic
    open({ view: "Networks"});
  }, [/* dependencies */]);
  const connectWallet = useCallback(async () => {
    // Implementation of wallet connection logic
    open();
  }, [/* dependencies */]);

  const autoFetchWallet = useCallback(async () => {
    // Implementation of auto-fetch wallet logic
  }, [/* dependencies */]);
  
  // const walletDisplayText = walletConnected
  // ? `${walletButtonText.slice(0, 5)}...${walletButtonText.slice(-4)}`
  // : "Connect Wallet";
  const state = useWeb3ModalState();
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  
  useEffect(() => {
    if (address) {
      console.log("isConnected inside useeffect");
      setWalletConnected(true);
      // walletDisplayText(address);
      setUserWallet(address);
      // setWalletButtonText(address);
      dispatch(connectSocketThunk(address));
    } 
    else {
      setWalletConnected(false);
      setUserWallet(null);
    }
  },[address]);

  console.log(state,address, chainId, isConnected)
  return (
    <nav className={styles.nav}>
      <div className="logo-container" onClick={handleLogoClick}>
        <img src={teztileLogo} alt="Logo" className={styles.logo} />
      </div>

      {/* <ConnectButton /> */}
      <div className="walletContainer"
      style={{
        display: "flex",
        alignItems: "center",
        columnGap: "10px",
      }}>
        <button onClick={selectNetwork} className={styles.button} style={{
        display: "flex",
        alignItems: "center",
        columnGap: "5px",
        }}>
          {/* {console.log("isConnected inside return", isConnected)} */}
          
          {isConnected ? <> 
            <IoIosSwap />
              {address.slice(0, 5)}...{address.slice(-4)}
            </>
            : "Connect Wallet"}
  
        </button>
        <button onClick={connectWallet} className={styles.button}> 
        <IoIosWallet /> 
        </button>
        {walletConnected && (
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
            alt="Profile"
            className="profileImg"
            onClick={handleProfileClick}
          />
        )}
      </div>

      
    </nav>
  );
}

export default Navbar;
