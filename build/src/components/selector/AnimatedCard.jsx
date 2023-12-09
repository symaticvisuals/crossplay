import React, { useState } from 'react';
import './AnimatedCard.css'; // Separate CSS file for the AnimatedButton

const AnimatedButton = ({ children, onClick, className }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        '--x': `${cursorPosition.x}px`,
        '--y': `${cursorPosition.y}px`,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:"2rem",
        flexDirection:"column",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedButton;
