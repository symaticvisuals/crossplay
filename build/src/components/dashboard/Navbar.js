import { useContext, useEffect, useState } from "react";
import styles from "./scss/Navbar.scss";
import teztileLogo from "../../img/tezTile.png"
import { useDispatch } from "react-redux";
import { connectSocketThunk } from "../../api/socketSlice";

import { useNavigate } from "react-router-dom";
import { manageFunc } from "../../providers/state-provider";



function Navbar() {
  const [walletButtonText, setWalletButtonText] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const { userWallet, setUsetWallet } = useContext(manageFunc);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function connectWallet() {
   
  }

  async function autoFetchWallet() {
   
  }

  useEffect(()=>{
    autoFetchWallet()
  },[])
  
  return (
    <nav className={styles.nav}>
      <div className="logo-container" onClick={()=>(navigate("/home"))}>
        <img
          src={teztileLogo}
          alt="Logo"
          className={styles.logo}
        />
      </div>

      <div className="walletContainer">
        {walletConnected && (
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
            alt="Profile"
            className="profileImg"
            onClick={() => navigate('/profile')}
          />
        )}
        <button
          onClick={connectWallet}
          className={styles.button}
        >
          {walletConnected ? walletButtonText.slice(0,5)+"..."+walletButtonText.slice(-4) : "Connect Wallet"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
