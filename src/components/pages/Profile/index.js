import React, { useState } from "react";
// import API from "../../../utils/API";
import Axios from "axios";
import "../Profile/style.css";
import API from "../../../utils/API.js";

const Profile = (props) => {
  const [imageSelected, setImageSelected] = useState("");
  const [publicPhotoUrl, setPublicPhotoUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("");
  // const [username, setUsername] = useState("");

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
      }
    );
  };

  const handleUpdateUserBio = (e) => {
    e.preventDefault();
    const bioObj = {
      bio: bio
    };
    API.editBio(bioObj).then((data) => {
      if (data.token) {
        props.setIsEditing(true);
        props.setBio(data.user.bio);
      }
    })
  }

  return (
    <section>
      <div className="column">
        <div className="left">
          <div id="profileSection">
            <div>
              <h2>{props.username}</h2>
              <div id="avatar">
                <label htmlFor="profile-image">
                  {publicPhotoUrl ? (
                    <img
                      src={publicPhotoUrl}
                      id="setProfileImage"
                      alt="Profile"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <img
                      src="profile.jpg"
                      id="starterProfileImage"
                      alt="Profile"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
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
              <div className="profileBtns">
                <button onClick={uploadImage}>Save Image</button>
              </div>
            </div>

            <div id="userBio">
              {/* <h3>BIOGRAPHY</h3>
              <div className="profileBtns">
                <button onClick={handleUpdateUserBio}>Edit</button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="right">
          <div id="feedBody">
            <h3>GAME STATS</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
