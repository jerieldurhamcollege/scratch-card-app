import "../styles.css";
import moneybag from "../images/png/new-moneybag.png";
import coingroup from "../images/svg/coin-group.svg";
import formicon from "../images/svg/icon-form.svg";
import ticketicon from "../images/svg/icon-ticket.svg";
import trophyicon from "../images/svg/icon-trophy.svg";
import Sponsors from "../components/sponsors";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="grid-container">
      <div className="grid-x grid-padding-x">
        <div className="large-6 medium-6 small-12 cell align-self-middle margin-top-2">
          <h1>We've Got Your Lunch Covered</h1>
          <p>
            Back again for another year, BuyMore Dollars has got your back with
            our scratch and win contest!
          </p>
          <Link to="/contest">
            <input
              type="button"
              value="Play To Win"
              id="play"
              className="button"
            ></input>
          </Link>
        </div>
        <div className="large-6 medium-6 small-12 cell hero-image ">
          <img src={moneybag} alt="bag of money" />
        </div>
      </div>

      <div className="grid-x grid-padding-x contest-content">
        <div className="large-6 medium-6 small-12 cell">
          <div className="scratch-win-box-card">
            <h2>Scratch and Win</h2>
            <p>
              For this year's contest, we have teamed up with some of your
              favourite restaurants. With BuyMore Dollars you win your way to
              free meals on us!
            </p>
            <Link to="/contest">
              <input
                type="button"
                value="Play To Win"
                id="play"
                className="button"
              ></input>
            </Link>

            <Link to="/legal">
              <input type="button" value="*Terms and Conditions Apply"></input>
            </Link>

            <h3>Come back every 72 hours to play</h3>
          </div>
        </div>

        <div className="large-6 medium-6 small-12 cell ">
          <div className="prizes-box-card">
            <div className="grid-x grid-padding-x">
              <div className="large-12 medium-12 small-12 cell">
                <h2>BMD Prizes</h2>
              </div>
              <div className="large-7 medium-6 small-6 cell prizes-coin">
                <img
                  src={coingroup}
                  alt="group of coins"
                  className="coingroup"
                />
              </div>
              <div className="large-5 medium-6 small-6 cell ">
                <div className="prizes-list align-right">
                  <div className="prize-info">
                    <h3>10,000 BMDs</h3>
                    <p>1 prize</p>
                  </div>
                  <div className="prize-info">
                    <h3>750 BMDs</h3>
                    <p>5 prizes</p>
                  </div>
                  <div className="prize-info">
                    {" "}
                    <h3>100 BMDs</h3>
                    <p>10 prizes</p>
                  </div>
                  <div className="prize-info">
                    {" "}
                    <h3>20 BMDs</h3>
                    <p>100 prizes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-x grid-padding-x rules-content">
        <div className="large-4 medium-4 small-12 cell">
          <div className="rules-box-card">
            <img src={formicon} alt="icon from" className="rules-icons" />
            <h3>Register</h3>
            <p>Hit play to win and fill out the sign up info</p>
          </div>
        </div>

        <div className="large-4 medium-4 small-12 cell">
          <div className="rules-box-card">
            <img src={ticketicon} alt="icon ticket" className="rules-icons" />
            <h3>Scratch and Play</h3>
            <p>
              Once registered, click and drag the scratch area to reveal your
              prize
            </p>
          </div>
        </div>

        <div className="large-4 medium-4 small-12 cell">
          <div className="rules-box-card">
            <img
              src={trophyicon}
              alt="icon trophy"
              className="rules-icons icon-trophy"
            />
            <h3>Claim Your Prize</h3>
            <p>
              After scratching, your BuyMore Dollars will be added to your
              account. You can play once every 72 hours
            </p>
          </div>
        </div>
      </div>

      <div className="grid-x grid-padding-x">
        <div className="large-12 medium-12 small-12 cell  ptw-btn">
          <Link to="/contest">
            <input
              type="button"
              value="Play To Win"
              id="play"
              className="button"
            ></input>
          </Link>
        </div>
      </div>

      <div className="grid-x grid-padding-x">
        <div className="large-12 medium-12 small-12 cell">
          <Sponsors />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
