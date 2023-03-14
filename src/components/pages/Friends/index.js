import React, { useState, useEffect } from "react";
import API from '../../../utils/API';
import "../Friends/style.css"




const Friends = ({ userId }) => {
  console.log(userId);
  let userFriends 
  const [friendList, setFriendList] = useState(0) 
  useEffect(() => {
    const userData = API.getUsersById(userId).then((data) => {
      console.log(data)
      userFriends = data.Friends
    });
  }, []);

  return (
    <div>
      <h2>Friends List</h2>
      {userFriends?.map(friendList => <p>{friendList.friendId}</p>)}
    </div>
  );
};

export default Friends;


// function FriendList() {
  // API.addFriend({"friendId": 1},2)


  // return (
  //   <ul>
  //     <h1>Friends List</h1>
      
      {/* {data.friend.map(({ friendId, userId, username, onlineStatus, inGameStatus, wins, losses }) => (
        <li key={friendId}>
          <p>Friend ID: {friendId}</p>
          <h2>User ID: {userId}</h2>
          <p>Username: {username}</p>
          <p>Online Status: {onlineStatus}</p>
          <p>In-Game Status: {inGameStatus}</p>
          <p>Wins: {wins}</p>
          <p>Losses: {losses}</p>
        </li>
      ))} */}
//     </ul>
//   );
// }

// export default FriendList;