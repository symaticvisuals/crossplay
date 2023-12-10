import { useContext, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import CreateGame from './CreateGame';
import './scss/GameCards.css';
import PublicRooms from './PublicRooms';
import { useNavigate } from 'react-router-dom';
import { manageFunc } from '../../App';
import JoinGame from './JoinGame';

function GameCards() {
    const [createJoinSwap, setCreateJoinSwap] = useState(false);
    const { userWallet } = useContext(manageFunc);
    const navigate = useNavigate();

    return (
        userWallet ? (
            <div className='' style={{
                display:"grid",
                height:"500px",
                gridTemplateColumns:"1fr 1fr",
                marginTop:"20px",
                gap:"20px",
            }}>
                <PublicRooms />
                <SwitchTransition>
                    <CSSTransition
                        key={createJoinSwap ? 'CreateGame' : 'createGame'}
                        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
                        classNames='slide'
                    >
                        {createJoinSwap ? 
                            <JoinGame swapFunc={setCreateJoinSwap} /> : 
                            <CreateGame swapFunc={setCreateJoinSwap} />
                        }
                    </CSSTransition>
                </SwitchTransition>
            </div>
        ) : (
            <div className="wallet-connect-message"
            style={{
                marginTop:"20px",
            }}
            >
                <h3>{`Don't`} be a square! 
                    <br /> 
                    Connect your wallet to play Teztile and see your name at the
                    top of the leaderboard!
                </h3>
                <br />
                <button onClick={() => navigate('/demo', { replace: true })}>
                    Try Demo
                </button>
            </div>
        )
    );
}

export default GameCards;
