import React, { useState } from 'react';
import './NetworkSelector.css'; // You can create a CSS file for styling
// import {  } from 'react-icons/ri'; // Import Ethereum icon
import { IoIosArrowDroprightCircle } from 'react-icons/io'; // Import other icons
import { open } from '../wallet';

const NetworkSelector = () => {
  const chains = [
    { name: 'Ethereum', icon: <IoIosArrowDroprightCircle /> },
    { name: 'Ethereum Testnet', icon: <IoIosArrowDroprightCircle /> },
    { name: 'Polygon', icon: <IoIosArrowDroprightCircle /> },
    { name: 'Arbitrum', icon: <IoIosArrowDroprightCircle /> },
    { name: 'Mantle', icon: <IoIosArrowDroprightCircle /> },
    { name: 'Base Sepolia', icon: <IoIosArrowDroprightCircle /> },
  ];
  const onSelectChain = (chainName) => {
    console.log(chainName);
    open();
  };    

//   const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e) => {
//     setCursorPosition({ x: e.clientX, y: e.clientY });
//   };

  const handleSelect = (chainName) => {
    onSelectChain(chainName);
  };

  return (
    <div
      className="network-selector"
    //   onMouseMove={handleMouseMove}
    >
      {chains.map((chain, index) => (
        <div
          key={chain.name}
          className={`chain-card ${chain.name.toLowerCase()}`}
          style={{
            // background: `linear-gradient(45deg, #FF00D0, #00FFEA)`,
            // boxShadow: `0 0 10px rgba(255, 0, 208, 0.8), 0 0 20px rgba(0, 255, 234, 0.8)`,
            // transform: `translate(${cursorPosition.x * 0.02 * index}px, ${cursorPosition.y * 0.02 * index}px)`,
          }}
          onClick={() => handleSelect(chain.name)}
        >
          <div className="chain-icon">{chain.icon}</div>
          <div className="chain-name">{chain.name}</div>
        </div>
      ))}
    </div>
  );
};

export default NetworkSelector;
