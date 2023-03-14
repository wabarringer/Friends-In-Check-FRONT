import React, { useEffect, useState } from "react";
import "../Friends/style.css";
import API from "../../../utils/API";

const Friends = ({ userId }) => {
  useEffect(() => {
    const userData = API.getUsersById(userId).then((data) => {
      console.log(data);
      const friends = data.Friends;
      console.log(friends);
    });
  }, []);

  return (
    <div>
      <h2>No friends here</h2>
    </div>
  );
};

export default Friends;
