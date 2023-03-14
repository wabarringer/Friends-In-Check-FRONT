import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Friends/style.css";
import API from "../../../utils/API";

const Friends = ({ userId }) => {
  console.log(userId);

  useEffect(() => {
    const userData = API.getUsersById(userId).then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h2>No friends here</h2>
    </div>
  );
};

export default Friends;
