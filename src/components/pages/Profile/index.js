import React, { useState } from "react";
import "./style.css";

const Profile = () => {
  return (
    <div className="column">
      <div className="left">
        <div id="profileSection">
          <div>
            <h3>USERNAME</h3>
            <div id="avatar">
              IMAGE
            </div>
          </div>
          
          <div id="userBio">
            USER BIO
          </div>
        </div>

      </div>

      <div className="right">
        <div id="feedBody">
          STATS FEED
        </div>
      </div>
    </div>
  );
};

export default Profile;
