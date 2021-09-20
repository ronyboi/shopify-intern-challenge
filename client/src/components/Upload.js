import React, { useRef, useEffect, useState } from "react";
import S3 from "react-aws-s3";
import axios from "axios";
import { connect } from "react-redux";
import setAuthToken from "../utils/setAuthToken";
import { logout } from "./subcomponent/Login";
import PropTypes from "prop-types";
import Images from "./Images";
import Image from "./subcomponent/Image";

const Upload = ({ auth: { isAuthenticated, user }, logout }) => {
  const fileInput = useRef();
  const [update, setUpdate] = useState(true);
  const [images, setImages] = useState([]);

  const [caption, setCaption] = useState("");

  const onChange = (e) => {
    setCaption(e.target.value);
  };

  useEffect(async () => {
    await axios.get("/api/posts").then((res) => setImages(res.data));
  }, [update]);

  const onDelete = () => {
    setUpdate(!update);
  };

  const handleClick = (e) => {
    e.preventDefault();
    let file = fileInput.current.files[0];
    let newFileName = fileInput.current.files[0].name;
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
    };
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      console.log(data);
      if (data.status === 204) {
        console.log("success!");

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify({
          caption: caption,
          image:
            "https://shopifyapplicationbucket.s3.us-east-2.amazonaws.com/" +
            newFileName,
          name: user.name,
        });

        axios.post("/api/posts/", body, config);
        onDelete();
      } else {
        console.log("failure!");
      }
    });
    console.log(fileInput.current);
  };

  return (
    <div>
      <form onSubmit={handleClick}>
        <label>
          Upload file:
          <input type="file" ref={fileInput} />
        </label>
        <label>
          Caption:
          <input
            type="caption"
            value={caption}
            name="caption"
            onChange={(e) => onChange(e)}
          />
        </label>
        <br />
        <button type="submit" href="/images">
          Upload!
        </button>
      </form>
      <a onClick={logout} href="/">
        Logout!
      </a>
      <div>
        {images.length > 0 ? (
          images.map((item) => (
            <Image source={item} user={user} onDelete={onDelete} />
          ))
        ) : (
          <div>No images posted!</div>
        )}
      </div>
    </div>
  );
};

Upload.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Upload);
