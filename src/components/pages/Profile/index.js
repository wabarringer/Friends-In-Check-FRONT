import React, { useState } from "react";
import Axios from "axios";
import "./style.css";
import "../Profile/style.css";


const Profile = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [publicPhotoUrl, setPublicPhotoUrl] = useState("");

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "xqkzjxyi");

    Axios.post(
      "https://api.cloudinary.com/v1_1/dkzenaz20/image/upload",
      formData
    )
      .then((response) => {
        console.log(response);
        setPublicPhotoUrl(response.data.secure_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="column">
      <div className="left">
        <div id="profileSection">
          <div>
            <h3>USERNAME</h3>
            <div id="avatar">
              <label htmlFor="profile-image">
                {publicPhotoUrl ? (
                  <img src={publicPhotoUrl} id="setProfileImage" alt="Profile" style={{ maxWidth: "100%", maxHeight: "100%", objectFit:"cover", borderRadius:"50%" }} />
                ) : (
                  <img src="profile.jpg" id="starterProfileImage" alt="Profile" style={{ maxWidth: "100%", maxHeight: "100%", objectFit:"cover", borderRadius:"50%" }} />
                )}
              </label>
              <input
                type="file"
                id="profile-image"
                style={{ display: "none" }}
                onChange={(event) => {
                  setImageSelected(event.target.files[0]);
                }}
              />
            </div>
            <button onClick={uploadImage}>Save</button>

          </div>
          
          <div id="userBio">USER BIO</div>
        </div>
      </div>
      <div className="middle">
        {/* <button onClick={uploadImage}>Save</button> */}
      </div>
      <div className="right">
        <div id="feedBody">STATS FEED</div>
      </div>
    </div>
  );
};

export default Profile;