import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import Log from "../components/Log";
import NewPostForm from "../components/Post/NewPostForm";
import Trends from "../components/Trends";
import FriendsHints from "../components/Profil/FriendsHints";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {uid ? <NewPostForm /> : <Log signIn={true} signUp={false} />}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {uid && <FriendsHints />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
