import React from 'react'
import sum from '../../img/divider-black.png'
import './scss/Info.css'

function Why() {
  return (
    <div className='' style={{
      height:"500px"
    }}>
    <div className='wrapper'>
        <h1>Why WEB3 & EVM?</h1>
        <p>Gamers around the globe spent $70 billion on games in 2020 without any possibility of returns. But Web 3.0 gaming could change that and Tezos Blockchain is the right choice for the same.
        <br />
        <br />
        Transaction costs are low, ensuring an openness of participation you’d expect from a global decentralized community & transaction times are low, providing a faster and great user experience while doing transactions on chain.
        </p>
    </div>
    {/* <img className='divider' src={sum}></img> */}
  </div>
  )
}

export default Why