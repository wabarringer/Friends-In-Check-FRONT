import React, { useState, useEffect } from "react";
import API from "../../../utils/API";
import "../Friends/style.css";

const Friends = ({ userId, username }) => {
  const [userFriends, setUserFriends] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");
  // const [foundUser, setFoundUser] = useState(null);

  useEffect(() => {
    API.getUsersById(userId).then((data) => {
      console.log(data);
      setUserFriends(data.friend);
    });
  }, [userId]);
  console.log(userFriends);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setSearchedUser(e.target.value);
  };

  const findUser = (e) => {
    e.preventDefault();
    API.getUsersByUsername(searchedUser).then((data) => {
      if (data.username === searchedUser) {
        setUserFriends([data.friend]);
      }
    });
  };

  console.log(API.getUsersByUsername(searchedUser));

  return (
    <section>
      <div className="column">
        <div className="friendPageDiv">
          <div className="userInfoDiv">
            <h2>{username}'s friends</h2>
            <input
              type="input"
              id="user-search"
              onChange={handleSearchInput}
              value={searchedUser}
              placeholder="Add a friend"
            />
            <button onClick={findUser}>Add</button>
          </div>

          <div className="friendsDiv">
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
