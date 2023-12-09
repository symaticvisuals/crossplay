import { useContext, useEffect, useState, useCallback } from "react";
import  "./scss/Navbar.scss";
import styles from "./scss/Navbar.module.scss";
import teztileLogo from "../../img/tezTile.png";
import { useDispatch } from "react-redux";
import { connectSocketThunk } from "../../api/socketSlice";
import { useNavigate } from "react-router-dom";
import { manageFunc } from "../../providers/state-provider";

function Navbar() {
  const [walletButtonText, setWalletButtonText] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const { userWallet, setUserWallet } = useContext(manageFunc);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogoClick = () => navigate("/home");
  const handleProfileClick = () => navigate("/profile");

  const connectWallet = useCallback(async () => {
    // Implementation of wallet connection logic
  }, [/* dependencies */]);

  const autoFetchWallet = useCallback(async () => {
    // Implementation of auto-fetch wallet logic
  }, [/* dependencies */]);

  useEffect(() => {
    autoFetchWallet();
  }, [autoFetchWallet]);

  const walletDisplayText = walletConnected
    ? `${walletButtonText.slice(0, 5)}...${walletButtonText.slice(-4)}`
    : "Connect Wallet";

  return (
    <nav className={styles.nav}>
      <div className="logo-container" onClick={handleLogoClick}>
        <img src={teztileLogo} alt="Logo" className={styles.logo} />
      </div>

      <div className="walletContainer">
        {walletConnected && (
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
            alt="Profile"
            className="profileImg"
            onClick={handleProfileClick}
          />
        )}
        <button onClick={connectWallet} className={styles.button}>
          {walletDisplayText}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
