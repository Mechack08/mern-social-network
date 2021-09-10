import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.action";

const UploadImg = () => {
  const [picture, setPicture] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  //upload picture function
  const handlePicture = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", picture);

    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <label htmlFor="file">Changer l'image</label>
      <input
        type="file"
        name="file"
        id="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setPicture(e.target.files[0])}
      />
      <br />
      <input type="submit" value="Changer" />
    </form>
  );
};

export default UploadImg;
