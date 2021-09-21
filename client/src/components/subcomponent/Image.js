import axios from "axios";
import React from "react";

export default function Image({ source, user, onDelete }) {
  const handleClick = async (e) => {
    await axios.delete(`/api/posts/${source._id}`);
    onDelete();
  };

  return (
    <div>
      {user != null ? (
        <div className="image">
          <div className="image-info">
            <h2>{source.caption}</h2>
            {user._id === source.user && (
              <button onClick={(e) => handleClick(e)}>Delete me!</button>
            )}
            <h3>Posted by, {source.name}</h3>
          </div>
          <img
            src={source.image}
            className="image-source"
            alt={source.caption}
          />
        </div>
      ) : (
        <div className="image">
          <div className="image-info">
            <h2>{source.caption}</h2>
            <h3>Posted by, {source.name}</h3>
          </div>
          <img
            src={source.image}
            className="image-source"
            alt={source.caption}
          />
        </div>
      )}
    </div>
  );
}
