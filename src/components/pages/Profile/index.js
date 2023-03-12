import React, { useState } from "react";
import Axios from "axios";
import "./style.css";

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
    // <div>
    //   <input
    //     type="file"
    //     onChange={(event) => {
    //       setImageSelected(event.target.files[0]);
    //     }}
    //   />
    //   <button onClick={uploadImage}>Save</button>
    //   {publicPhotoUrl && (
    //     <img src={publicPhotoUrl} alt="Uploaded image" />
    //   )}
    // </div>
    <div className="column">
          <div>
      <input
        type="file"
        onChange={(event) => {
          setImageSelected(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}>Save</button>
      {/* {publicPhotoUrl
       && (
        <img src={publicPhotoUrl} alt="Uploaded image" />
      )
      } */}
    </div>
      <div className="left">
        <div id="profileSection">
          <div>
            <h3>USERNAME</h3>
            <div id="avatar">
                {publicPhotoUrl
                && (
                  <img src={publicPhotoUrl} alt="Uploaded image" />
                )
      }            
      </div>
          </div>
          
          <div id="userBio">
            USER BIO
          </div>
        </div>

      </div>

      <div className="right">
        <div id="feedBody">
          STATS FEED
        </div>
      </div>
    </div>
  );
}

// const Profile = () => {
//   return (
//     <div className="column">
//       <div className="left">
//         <div id="profileSection">
//           <div>
//             <h3>USERNAME</h3>
//             <div id="avatar">
//               IMAGE
//             </div>
//           </div>
          
//           <div id="userBio">
//             USER BIO
//           </div>
//         </div>

//       </div>

//       <div className="right">
//         <div id="feedBody">
//           STATS FEED
//         </div>
//       </div>
//     </div>
//   );
// };



export default Profile;
