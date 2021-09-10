import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = ({ id }) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(id));
  };

  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous vraiment supprimer cet Post ?")) {
          deleteQuote();
        }
      }}
    >
      <img src="./img/icons/trash.svg" alt="delete-post" />
    </div>
  );
};

export default DeleteCard;
