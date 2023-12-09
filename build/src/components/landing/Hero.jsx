import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import bgImage from "../../img/pxfuel.jpg";
import footerBg from "../../img/black-footer-back.png";
import brandLogo from "../../img/brand-logo.png";

export default function Hero() {
  const scrollToTop = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  return (
    <>
      <WrapperHome>
        <img
          src={brandLogo}
          style={{
            width: "10%",
            margin: "4rem 0 0 4rem",
          }}
        ></img>

        <ContentWrapper>
          <h1
            style={{
              fontFamily: "Righteous, sans-serif",
            }}
          >
            {" "}
            The Pioneering Space <br />
            <span
              style={{
                fontFamily: "Righteous, sans-serif",
                color: "#D14FFE",
              }}
            >
              Odyssey Game{" "}
            </span>
            Now Uniting Players on 
            <span
              style={{
                fontFamily: "Righteous, sans-serif",
                color: "#D14FFE",
              }}
            >
               {" "}EVM
            </span>
          </h1>
          <Link to={"/home"}>
            <button>Play Now</button>
          </Link>
        </ContentWrapper>
        {/* <a onClick={scrollToTop} className="scroll">
          <span></span>
        </a> */}
      </WrapperHome>
    </>
  );
}

const Logo = styled.div`
  text-align: left;
  margin: 4rem 0 0 4rem;

  @media (max-width: 768px) {
    margin: 40px 2rem 0 0;

    img {
      width: 30%;
    }
  }
`;

const ContentWrapper = styled.div`
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    padding-top:100px;
    width: 40%;
    font-size: 52px;
    margin: 6rem 4rem 0 0;
  }
  img {
    width: 280px;
    margin: 20px 50px 0 0;
  }
  button {
    width: 240px;
    height: 72px;
    font-size: 32px;
    font-weight: 700;
    background-color: #D14FFF;
    color: #fff;
    border-radius: 20px;
    margin: 40px 4rem 0 0;
  }
  button:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    button {
      font-size: 26px;
    }
    div {
      margin: 40px 2rem 0 0;
    }
    h1 {
      width: 90%;
      font-size: 2.5rem !important;
      margin: 4rem 2rem 2rem 0;
      font-weight: 500;
    }
    img {
      margin: 20px 2rem 0 0;
    }
    button {
      margin: 0 2rem 0 0;
    }
  }
`;

const WrapperHome = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: url(${bgImage}) #000 no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-size: cover;
  overflow: hidden;

  &&after {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 100%;
    transform-origin: 0 100%;
    transform: translateZ(8px);
    pointer-events: none;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.013) 8%,
      rgba(0, 0, 0, 0.049) 14.8%,
      rgba(0, 0, 0, 0.104) 20.8%,
      rgba(0, 0, 0, 0.175) 26%,
      rgba(0, 0, 0, 0.259) 30.8%,
      rgba(0, 0, 0, 0.352) 35.3%,
      rgba(0, 0, 0, 0.45) 39.8%,
      rgba(0, 0, 0, 0.55) 44.5%,
      rgba(0, 0, 0, 0.648) 49.5%,
      rgba(0, 0, 0, 0.741) 55.2%,
      rgba(0, 0, 0, 0.825) 61.7%,
      rgba(0, 0, 0, 0.896) 69.2%,
      rgba(0, 0, 0, 0.951) 77.9%,
      rgba(0, 0, 0, 0.987) 88.1%,
      black 100%
    );
    z-index: 3;
  }
  .scroll {
    content: "";
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translatex(-50%);
    z-index: 2;
    display: inline-block;
    color: #fff;
    transition: opacity 0.3s;
  }

  .scroll:hover {
    opacity: 0.5;
  }
  a {
    padding-top: 60px;
  }
  a span {
    position: absolute;
    bottom: 5%;
    left: 50%;
    width: 30px;
    height: 50px;
    margin-left: -15px;
    border: 2px solid #fff;
    border-radius: 50px;
    box-sizing: border-box;
  }
  a span::before {
    position: absolute;
    top: 10px;
    left: 50%;
    content: "";
    width: 6px;
    height: 6px;
    margin-left: -3px;
    background-color: #fff;
    border-radius: 100%;
    animation: sdb9 2s infinite;
    box-sizing: border-box;
  }
  @keyframes sdb9 {
    0% {
      transform: translate(0, 20px);
      opacity: 0;
    }
    40% {
      opacity: 1;
    }
    80% {
      transform: translate(0, 0);
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    background: url(${footerBg}) #000 no-repeat center center;
    /* background-attachment: fixed; */
    background-size: cover;
    height: 100vh;
    background-position-x: -650px;
    h1 {
      font-size: 38px;
    }
  }
`;
