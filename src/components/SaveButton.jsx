import "../styles/saveButton.css";
import { useState } from "react";

function SaveButton({ movie }) {
  const currentId = movie.id;

  const [saved, setSaved] = useState(() => {
    const savedMovies = localStorage.getItem("savedMovies");
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const isSaved = saved.includes(currentId);

  const handleClick = () => {
    let updatedSaved;

    if (isSaved) {
      updatedSaved = saved.filter((id) => id !== currentId);
    } else {
      updatedSaved = [...saved, currentId];
    }

    setSaved(updatedSaved);

    localStorage.setItem(
      "savedMovies",
      JSON.stringify(updatedSaved)
    );
  };

  return (
    <button className="favorite-button" onClick={handleClick}>
      <svg className="bookmark-icon">
        <use href="/icons.svg#bookmark-icon" />
      </svg>

      {isSaved ? "REMOVE SAVE" : "ADD SAVE"}
    </button>
  );
}

export default SaveButton;