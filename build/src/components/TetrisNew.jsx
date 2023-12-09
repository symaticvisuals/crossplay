// import React from 'react';
import Tetris from 'react-tetris';
import './TetrisNew.css';

import React from 'react'

function TetrisNew() {
  return (
    <div className='root-game' >
    
    <Tetris
      keyboardControls={{
        // Default values shown here. These will be used if no
        // `keyboardControls` prop is provided.
        down: 'MOVE_DOWN',
        left: 'MOVE_LEFT',
        right: 'MOVE_RIGHT',
        space: 'HARD_DROP',
        z: 'FLIP_COUNTERCLOCKWISE',
        x: 'FLIP_CLOCKWISE',
        up: 'FLIP_CLOCKWISE',
        p: 'TOGGLE_PAUSE',
        c: 'HOLD',
        shift: 'HOLD'
      }}
    >
      {({
        HeldPiece,
        Gameboard,
        PieceQueue,
        points,
        linesCleared,
        state,
        // controller
      }) => (
        <div className='game-screen' style={{display:"flex", columnGap:"20px"}}>
          {/* <HeldPiece /> */}
          <div style={{color:"#fff"}}>
            <h1>LFGGG</h1>
            <div className="score">
                <h2>Your Score:</h2>
                <p>Points: {points}</p>
                <p>Lines Cleared: {linesCleared}</p>
            </div>
            <div className="instruct">
                <h2>Instructions:</h2>
                <p>Use Up arrow to rotate</p>
                <p>Use left-right arrow to navigate</p>
                <p>Use down arrow to speed up</p>
            </div>
          </div>
          <Gameboard />
          {/* <PieceQueue /> */}
          {/* {state === 'LOST' && (
            <div>
              <h2>Game Over</h2>
              <button onClick={controller.restart}>New game</button>
            </div>
          )} */}
        </div>
      )}
    </Tetris>
  </div>
  )
}

export default TetrisNew