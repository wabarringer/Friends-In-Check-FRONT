import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import "../Friends/style.css";
import MultiPlayerGame from "../../chess/MultiPlayerGame";

const Friends = ({ userId }) => {
  const [userFriends, setUserFriends] = useState([]);

  useEffect(() => {
    API.getUsersById(userId).then((data) => {
      console.log(data);
      setUserFriends(data.friend);
    });
    
  }, [userId]);
  console.log(userFriends)



  return (
    <div>
      <h2>Friends List</h2>
      {userFriends.map((friend) => (
        <p>{friend.username}</p>
      ))}
    </div>
  );
};

export default Friends;

