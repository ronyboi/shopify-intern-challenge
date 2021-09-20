import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "./subcomponent/Image";

export default function Images({ user, uploadUpdate }) {
  const [update, setUpdate] = useState(true);
  const [images, setImages] = useState([]);
  useEffect(async () => {
    await axios.get("/api/posts").then((res) => setImages(res.data));
  }, [update, uploadUpdate]);

  const onDelete = () => {
    setUpdate(!update);
  };

  return (
    <div>
      {images.length > 0 ? (
        images.map((item) => (
          <Image source={item} user={user} onDelete={onDelete} />
        ))
      ) : (
        <div>No images posted!</div>
      )}
    </div>
  );
}
