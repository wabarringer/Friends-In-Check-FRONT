import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import "../Friends/style.css";
import MultiPlayerGame from "../../chess/MultiPlayerGame";

const Friends = ({ userId, username }) => {
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    API.getUsersById(userId).then((data) => {
      console.log(data);
      setUserFriends(data.friend);
    });
  }, [userId]);
  console.log(userFriends);

  return (
    <section>
      <div className="column">
        <div className="friendPageDiv">
          <div className="userInfoDiv">
            <h2>{username}</h2>
          </div>

          <div className="friendsDiv">
            <h2>Friends List</h2>
            {userFriends.map((friend) => (
            <p>{friend.username}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Friends;
