import React, { useContext, useEffect, useCallback } from "react";
import { useWeb3ModalState, useWeb3ModalAccount } from '@web3modal/ethers/react';
import styles from "./scss/Navbar.module.scss";
import brandLogo from "../../assets/brand-logo.png";
import { useDispatch } from "react-redux";
import { connectSocketThunk } from "../../api/socketSlice";
import { useNavigate } from "react-router-dom";
import { manageFunc } from "../../App";
import { open } from "../wallet";
import { IoIosWallet, IoIosSwap } from 'react-icons/io';

function Navbar() {
  const { setUserWallet } = useContext(manageFunc);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useWeb3ModalState();
  const { address, isConnected } = useWeb3ModalAccount();

  useEffect(() => {
    if (address) {
      setUserWallet(address);
      dispatch(connectSocketThunk(address));
    } else {
      setUserWallet(null);
    }
  }, [address, dispatch, setUserWallet]);

  const handleLogoClick = () => navigate("/home");
  const handleProfileClick = () => navigate("/profile");

  const selectNetwork = useCallback(async () => {
    open({ view: "Networks" });
  }, []);

  const connectWallet = useCallback(async () => {
    open();
  }, []);

  

  return (
    <nav className={styles.nav} style={{
      // width:"100vw",
    }}>
      <div className="logo-container" style={{
        cursor: "pointer",
      }} onClick={handleLogoClick}>
        <img src={brandLogo} alt="Logo" className={styles.logo} />
      </div>

      <div className="walletContainer" style={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
        <button onClick={selectNetwork} className={styles.button} style={{ display: "flex", alignItems: "center", columnGap: "5px" }}>
          {isConnected ? (
            <> 
              <IoIosSwap />
              {address.slice(0, 5)}...{address.slice(-4)}
            </>
          ) : "Connect Wallet"}
        </button>

        <button onClick={connectWallet} className={styles.button}> 
          <IoIosWallet /> 
        </button>

        {isConnected && (
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
