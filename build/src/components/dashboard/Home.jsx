
// import "./scss/Home.scss"
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import GameCards from './GameCards';
import bgImage from '../../img/pxfuel.jpg'
import LeaderboardC from '../LeaderboardC';
function Home() {
  return (
    // <div className="home-wrapper">

    // <div className="home">
    //   <div className="background-handler">

    //   <Navbar />
     
    //   <div className="cards-container">
    //     <Leaderboard />
    //     {/* <GameCards /> */}
    //   </div>
    //   </div>
    // </div>
    //   </div>
  
    <div className="" style={{
    
      minHeight: "100vh",
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
      background: `url(${bgImage}) #000 no-repeat center center fixed`,
      backgroundSize: "cover",
      WebkitBackgroundSize: "cover",
     
    }}>
      <Navbar />
      <div className="" style={{
         padding:"10px 30px",
         width:"80vw",
         margin:"auto",
        
      }}>
       

        <LeaderboardC/>
        
        <GameCards/>
      </div>
        
    </div>
  )
}

export default Home