import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";

const FriendsHints = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    const notFreindList = () => {
      let array = [];
      usersData.map((user) => {
        if (user._id !== userData._id && !user.followers.includes(userData._id))
          return array.push(user);
      });
      array.sort(() => 0.5 - Math.random());

      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 3;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else array.length = 0;
      friendsHint && setFriendsHint(array);
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFreindList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [userData, usersData, playOnce]);

  return (
    <div className="get-friends-container">
      {!isEmpty(friendsHint[0]) > 0 ? (
        <h2>Suggestions</h2>
      ) : (
        <h2>No suggestions available</h2>
      )}
      {isLoading ? (
        <div className="icon">
          <i className="fas fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {friendsHint.length !== 0 &&
            friendsHint.map((user) => {
              return (
                <li className="user-hint" key={user._id}>
                  <img src={user.picture} alt="friend" />
                  <p>{user.pseudo}</p>
                  <FollowHandler idToFollow={user._id} type={"suggestion"} />
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default FriendsHints;
