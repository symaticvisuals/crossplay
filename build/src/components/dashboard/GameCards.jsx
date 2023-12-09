import  { useContext, useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import CreateGame from './createGame'
import './scss/GameCards.css'
import PublicRooms from './PublicRooms';
import { useNavigate } from 'react-router-dom';
import { manageFunc } from '../../App';
import JoinGame from './JoinGame';

function GameCards() {
    const [createJoinSwap, setCreateJoinSwap] = useState(false);
    const { userWallet } = useContext(manageFunc);
    const navigate = useNavigate();

  
    return (
      
        userWallet ? 
        <div className={'cardWrapper'}>
          <PublicRooms />
          <SwitchTransition>
            <CSSTransition
              key={createJoinSwap ? 'CreateGame' : 'createGame'}
              addEndListener={(node, done) => {
                node.addEventListener('transitionend', done, false);
              }}
              classNames={'slide'}
            >
              {createJoinSwap ? (
                <JoinGame swapFunc={setCreateJoinSwap} />
              ) : (
                <CreateGame swapFunc={setCreateJoinSwap} />
              )}
            </CSSTransition>
          </SwitchTransition>
        </div>
        :
        <div className={"wallet-connect-message"} 
        // style={{
        //   display: "flex", 
        //   flexDirection: "column",
        //   alignItems: "center",
        // }}
        
        >
              <h3 
              // style={{
              //   color: "white",
              //   fontSize: "1.5rem",
              //   fontWeight: "bold",
              //   textAlign: "center",
              //   marginTop: "0px",
              //   marginBottom: "0px",
              
              // }}
              >{`Don't`} be a square! 
                <br /> 
                Connect your wallet to play Teztile and see your name at the
                 top of the leaderboard!</h3>
              <br />
              <button onClick={()=>navigate('/demo',{replace:true})} 
              // style={{
              //   backgroundColor: "#FFC107",
              //   color: "black",
              //   fontSize: "1.5rem",
              //   fontWeight: "bold",
              //   padding: "10px 20px",
              //   borderRadius: "10px",
              //   border: "none",
              //   cursor: "pointer",
              
              // }}
              > Try Demo</button>
        </div>
      
    );
  }
  

            
export default GameCards