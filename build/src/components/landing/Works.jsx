import React from "react";
import icon1 from "../../img/3.png";
import icon2 from "../../img/1.png";
import icon3 from "../../img/4.png";
import icon4 from "../../img/2.png";
import blocks from "../../img/blocks.png";
import zigzag from "../../img/zigzag.png";
import bgImage from "../../img/pxfuel.jpg";
import "./scss/Works.css";

function Works() {
  return (
    <div
      className="section"
      style={{
        width: "100%",
        height: "70vh",
      }}
    >
      <div
        className=""
        style={{
          //sticky background
          // position:"fixed"a
          backgroundImage: `url(${bgImage})`,
          height: "100%",
        }}
      >
        <div
          className=""
          style={{
            width: "80vw",
            margin: "auto",
            paddingTop: "80px",
          }}
        >
          <h1
            style={{
              fontFamily: "Righteous, sans-serif",
              color: "white",
              fontSize: "40px",
            }}
          >
            How it works?
          </h1>
          <div
            className=""
            style={{
              width: "250px",
              padding: "2px",
              marginTop: "8px",
              background: "#d14fff",
            }}
          ></div>
          <div
            className="body"
            style={{
              width: "100%",
              marginTop: "4rem",
            }}
          >
            <div
              className="left"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                gridTemplateRows: "1fr 1fr",
              }}
            >
              <div
                className="item"
                style={{
                  background: "#0e0e0e",
                  borderRadius: "20px",
                  padding: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <img
                  src={icon1}
                  alt=""
                  style={{
                    width: "100px",
                  }}
                />
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Create a game by staking some tokens, It’ll generate a unique
                  game ID
                </p>
              </div>
              <div
                className="item"
                style={{
                  background: "#0e0e0e",
                  borderRadius: "20px",
                  padding: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <img
                  src={icon3}
                  alt=""
                  style={{
                    width: "100px",
                  }}
                />
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Share the unique game ID with your friend and wait for him to
                  stake tokens
                </p>
              </div>
              <div
                className="item"
                style={{
                  background: "#0e0e0e",
                  borderRadius: "20px",
                  padding: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <img
                  src={icon2}
                  alt=""
                  style={{
                    width: "100px",
                  }}
                />
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Once both the players staked the tokens, you’ll get a start
                  game button
                </p>
              </div>
              <div
                className="item"
                style={{
                  background: "#0e0e0e",
                  borderRadius: "20px",
                  padding: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <img
                  src={icon4}
                  alt=""
                  style={{
                    width: "100px",
                  }}
                />
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Winner will get the pooled token prize along with a game
                  snapshot NFT
                </p>
              </div>
            </div>
            {/* <div className="right">
                    <img src={blocks} alt="" />
                </div> */}
          </div>
        </div>
      </div>
      {/* <img className="pattern" src={zigzag} alt="" /> */}
    </div>
  );
}

export default Works;
