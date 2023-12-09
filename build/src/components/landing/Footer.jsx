import "./scss/Footer.css";
import tezTile from "../../img/brand-logo.png";
import proudly_tez from "../../img/footer-banner-without-logo.png";
import discord from "../../img/Discord.png";
import telegram from "../../img/Telegram.png";
import twitter from "../../img/Twitter.png";
import github from "../../img/Github.png";

function Footer() {
  return (
    <div
      className="footer"
      style={{
        background: "transparent",
      }}
    >
      <div className="wrapper" style={{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        width:"80%",
        margin:"auto",
        marginTop:"20px"
      
      }}>
        <div>
          <img className="logo" src={tezTile} alt="" />
          <div className="socials">
            <a href="#" target="_blank">
              <img src={github} alt="" />
            </a>
            <a
              href="https://twitter.com/teztile"
              target="_blank"
              rel="noreferrer"
            >
              <img src={twitter} alt="" />
            </a>
            <a href="#" target="_blank">
              <img src={telegram} alt="" />
            </a>
            <a href="#" target="_blank">
              <img src={discord} alt="" />
            </a>
          </div>
        </div>
        <div
          className=""
          style={{
            objectFit: "contain",
            width: "700px",
          }}
        >
          <img
            src={proudly_tez}
            alt=""
            className=""
            style={{
              objectFit: "contain",
              width: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
