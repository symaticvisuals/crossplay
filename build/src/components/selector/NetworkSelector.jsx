import "./NetworkSelector.css";
import AnimatedCard from "./AnimatedCard"; // Import the AnimatedCard component
import polygon from "./chain/polygon-6926578-5650860.png";
import base from "./chain/base.png";
import arbitrum from "./chain/arbitrum-9828481-7947843.png";
import celo from "./chain/vecteezy_celo-glass-crypto-coin-3d-illustration_24092750.png";
import mantle from "./chain/8000679.webp";
import scroll from "./chain/old-scroll-8619003-6858288.png";
import React, { useCallback, useEffect, useState } from "react";
import "./NetworkSelector.css"; // You can create a CSS file for styling
// import {  } from 'react-icons/ri'; // Import Ethereum icon
import { IoIosArrowDroprightCircle } from "react-icons/io"; // Import other icons
import { open } from "../wallet";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useNavigate } from "react-router";

const NetworkSelector = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const chains = [
    { name: "Ethereum", image: polygon },
    { name: "Ethereum Testnet", image: arbitrum },
    { name: "Ethereum", image: celo },
    { name: "Ethereum Testnet", image: mantle },
    { name: "Ethereum", image: scroll },
    { name: "Ethereum Testnet", image: base },
  ];
  const onSelectChain = (chainName) => {
    console.log(chainName);
    open();
  };

  const handleSelect = (chainName) => {
    onSelectChain(chainName);
  };

  const selectNetwork = useCallback(async () => {
    open({ view: "Networks" });
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate("/home");
    }
  }, [isConnected, navigate]);

  return (
    <div className="">
      <h1
        className="heading-network-selector"
        style={{
          fontFamily: "Righteous",
        }}
      >
        Select your Poison
      </h1>
      <p style={{
        fontSize:"20px",
        color:"white", 
        textAlign:"center",
        marginTop:"-50px",
        marginBottom:"30px",
      }}>We support cross-chain gameplay</p>
      <div className="network-selector">
        {chains.map((chain, index) => (
          <AnimatedCard
            key={chain.name}
            className={`chain-card ${chain.name.toLowerCase()}`}
            onClick={() => handleSelect(chain.name)}
          >
            <img
              src={chain.image}
              alt=""
              style={{
                width: "150px",
                height: "150px",
              }}
            />
            {/* {chain.name} */}
          </AnimatedCard>
        ))}
      </div>
      <div className="container-button-network">
        <button className="network-selector-button" onClick={selectNetwork}>
          {`Let's Start`}
        </button>
      </div>
    </div>
  );
};

export default NetworkSelector;
