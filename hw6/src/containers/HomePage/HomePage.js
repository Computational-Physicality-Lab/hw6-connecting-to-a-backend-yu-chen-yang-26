import React from "react";
import "./HomePage.css";
import home from "../../assets/images/banner.png";

const HomePage = () => {
  return (
    <div className="home-body">
      <img className="home-pic" alt="" src={home} />
      <div className="home-text">
        <div className="home-textbox">
          <div className="home-textbox-header">
            We don't ship. We are not real.
          </div>
          <div className="home-textbox-content">
            We sell shirts. We are passionate about selling shirts. But keep in
            mind we have no infrastructure, supply chain, or mechanism to
            actually produce these shirts or fulfill the orders. But the shirts
            will always be real in your imagination.
          </div>
        </div>
        <div className="home-textbox">
          <div className="home-textbox-header">
            Design your own shirt! But help us do that...
          </div>
          <div className="home-textbox-content">
            Not only do we not sell shirts, but we let you design your own!
            Eventually. We actually kinda need your help implementing that. If
            you could build an actual paint-style interface that you can make
            design in that would be great :)
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
