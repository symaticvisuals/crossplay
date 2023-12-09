import React from "react";
import circles from "../../img/pattern_circle.png";
import "./scss/Info.css";
import asset1 from "../../img/controller.png";
function Info() {
  return (
    <div className="info" style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    }}>
      <div className="" style={{
        height:"100%",
        display:"grid",
        gridTemplateColumns:"1fr 1fr",
      }}>
        <div className="wrapper" style={{
          marginLeft:"150px"
        }}>
          <h1
            style={{
              fontFamily: "Righteous, sans-serif",
            }}
          >
            Play &
            <span
              style={{
                color: "#d14fff",
                fontFamily: "Righteous, sans-serif",
              }}
            >
              {" "}
              Collect
            </span>
          </h1>
          <div
            className=""
            style={{
              width: "350px",
              padding: "2px",
              marginTop: "8px",
              background: "#d14fff",
            }}
          ></div>
          <p>
            Redesigning the classic gaming experience to create an immersive
            web3 experience. You can journey through the retro childhood games
            through the layer of blockchain and collect the experience in form
            of NFTs.
          </p>
        </div>
        <div
        className=""
        style={{
          width: "100%",
          objectFit: "contain",
          // opacity :"0.2",
        }}
      >
        <img
          className=""
          style={{
            //  width:"100%",
            height: "550px",
            objectFit: "cover",
          }}
          src={asset1}
        ></img>
      </div>
      </div>
      
    </div>
  );
}

export default Info;
