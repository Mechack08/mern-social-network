import React, { useState } from "react";
import LeftNav from "../LeftNav";
import UploadImg from "./UploadImg";
import { useDispatch, useSelector } from "react-redux";
import { updateBio } from "../../actions/user.action";
import { dateParser, isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const error = useSelector((state) => state.errorReducer.userError);

  const dispatch = useDispatch();

  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const [followingPopUp, setFollowingPopUp] = useState(false);
  const [followersPopUp, setFollowersPopUp] = useState(false);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>{userData.pseudo}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="Profile" />
          <UploadImg />
          {!isEmpty(error.format) && <p>{error.format}</p>}
          {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Bio</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier Bio
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modification</button>
              </>
            )}
          </div>
          <h4>Compte crée depuis : {dateParser(userData.createdAt)}</h4>
          <h5 onClick={() => setFollowingPopUp(true)}>
            Abonnements :{" "}
            {userData.followings ? userData.followings.length : ""}
          </h5>
          <h5 onClick={() => setFollowersPopUp(true)}>
            Abonnés : {userData.followers ? userData.followers.length : ""}
          </h5>
        </div>
      </div>
      {followingPopUp && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnements</h3>
            <span onClick={() => setFollowingPopUp(false)} className="cross">
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followings.length; i++) {
                  if (user._id === userData.followings[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}

      {followersPopUp && (
        <div className="popup-profil-container">
          <div className="modal">
            <h3>Abonnés</h3>
            <span onClick={() => setFollowersPopUp(false)} className="cross">
              &#10005;
            </span>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id}>
                        <img src={user.picture} alt="user-pic" />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateProfil;
