import React from "react";
import { useState } from "react";
import { notify } from "components/Global/toast-notify";
import "../Profile.scoped.css";
import { useEffect } from "react";
import { useAuth } from "src/Context/AuthContext";
import { CiEdit } from "react-icons/ci";
import anonymous from "assets/_.jpeg";
import { isValidEmail } from "src/components/Global/check-email";

import fetchUpdateInfo from "../fetch/fetchUpdateInfo";
import { useMutation } from "@tanstack/react-query";
import fetchUploadprofilPicture from "../fetch/fetchUploadProfilePicture";
import fetchUploadPictureDescription from "../fetch/fetchUploadPictureDescription";

export default function CreateProfile() {
  const { user } = useAuth();

  const [profilPicture, setProfilePicture] = useState({});
  const [pictureDescription, setPictureDescription] = useState([]);
  const [infoProfile, setInfoProfil] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    gender: "",
    sexual_preference: "",
    email: user.email,
    beverage: "",
    description: "",
    tags: [],
    age: 0,
  });

  // const allEnum = useQuery(["users"], fetchEnum);
  // const mutationUpdateInfo = useMutation(fetchUpdateInfo);
  // const mutationUploadPP = useMutation(fetchUploadprofilPicture);
  // const mutationUploadPD = useMutation(fetchUploadPictureDescription);
  // const img = [anonymous, anonymous, anonymous, anonymous];

  const checkMymeType = (file) => {
    const maxSize = 40000;
    const validExt = ["gif", "png", "jpg", "jpeg"];
    const extn = file.type.split("/")[1];
    if (validExt.findIndex((elem) => elem == extn) == -1) {
      notify("warning", "extension is not good, you have to use ", validExt.join(","));
      return -1;
    }
    if (file.size > maxSize) {
      notify("warning", "image are too big, please retry with lighter image");
      return -1;
    }
    return 1;
  };

  function handleChange(event) {
    const name = event.target.name;

    if (name == "email") {
      if (!isValidEmail(event.target.value)) {
        notify("warning", "please enter right adresse mail");
        return;
      }
    }
    setInfoProfil({ ...infoProfile, [name]: event.target.value });
  }

  const input = document.getElementById("age");
  if (input) {
    input.addEventListener("change", updateValue);
  }

  function updateValue(e) {
    const value = e.target.value;

    if (!isNaN(value)) {
      if (parseFloat(value) > 18) {
        this.classList.remove("invalide");
        this.classList.add("valide");
        setInfoProfil({ ...infoProfile, [e.target.name]: Number(e.target.value) });
      } else {
        notify("warning", "you dont have the age to enter on this site, please wait your 18 years old");
        this.classList.remove("valide");
        this.classList.add("invalide");
      }
    } else {
      this.classList.remove("valide");
      this.classList.add("invalide");
    }
  }
  function showPreview(event) {
    if (event.target.files.length > 0) {
      if (checkMymeType(event.target.files[0]) == -1) {
        return;
      }
      const src = URL.createObjectURL(event.target.files[0]);
      let preview = document.getElementById("profile-picture");
      if (preview) {
        preview.src = src;
        setProfilePicture(event.target.files[0]);
      }
    }
  }

  function handleMultipleFile(event) {
    const clone = structuredClone(pictureDescription);

    if (clone.length > 4) {
      notify("warning", "you cant have more than 4 image");
      return;
    }
    if (checkMymeType(event.target.files[0]) == -1) {
      return;
    }
    const src = URL.createObjectURL(event.target.files[0]);
    let preview = document.getElementById("body-picture-list");
    if (preview) {
      let dynamicImage = document.createElement("img");
      dynamicImage.src = src;
      dynamicImage.style.width = "13rem";
      dynamicImage.style.minHeight = " 13rem";
      dynamicImage.style.height = "13rem";
      preview.appendChild(dynamicImage);
      clone.push(event.target.files[0]);
      setPictureDescription(clone);
    }
  }

  function saveProfile(event) {
    if (profilPicture instanceof File) {
      console.log(infoProfile, profilPicture, pictureDescription);
    }
    if (
      infoProfile.age == 0 ||
      !infoProfile.beverage ||
      !infoProfile.firstname ||
      !infoProfile.lastname ||
      !infoProfile.email ||
      pictureDescription.length != 4 ||
      !(profilPicture instanceof File) ||
      !infoProfile.sexual_preference ||
      // infoProfile.tags.length == 0 ||
      infoProfile.description.length == 0
    ) {
      notify("error", "you cant save you profile you need to fill all the input");
      return;
    }
    // mutationUploadPP.mutate(profilPicture);
    // mutationUploadPD.mutate(pictureDescription);
    // mutationUpdateInfo.mutate(infoProfile);
    notify("sucess", " account modfy");
  }
  return (
    <div className="container">
      <div className="container-body">
        <div className="body__info-user">
          <h1 className="title-1 body__info-user__identity-h1">{`@${user.username}`}</h1>
          <div className="body__info-user__description">
            <div className="body__info-user-preview">
              <img alt="profile-picture" id="profile-picture" src={user.profile_picture ? user.profile_picture : anonymous} className="info-user_profile-picture" />
              <label htmlFor="file-ip-1" className="body__info-user-preview-label">
                <CiEdit />
              </label>
              <input type="file" id="file-ip-1" accept="image/*" onChange={showPreview} />
            </div>
            <div className="body__info-user__identity">
              <div className="info-user__form">
                <p className="info-user__name">
                  <span className="info-user__indentity__input">
                    <label htmlFor="firstname">
                      <h3 className="title-1"> Your name</h3>
                    </label>
                    <input type="text" id="firstname" name="firstname" className="info-user__indentity__input body" value={infoProfile.firstname} onChange={handleChange} />{" "}
                  </span>
                  <span className="info-user__indentity__input">
                    <label htmlFor="lastname">
                      <h3 className="title-1"> Your last name</h3>
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="info-user__indentity__input body"
                      value={infoProfile.lastname}
                      placeholder="whats your lastname ?"
                      onChange={handleChange}
                    />{" "}
                  </span>
                </p>
                <p className="info-user__name">
                  <span className="info-user__indentity__input">
                    <label htmlFor="age">
                      <h3 className="title-1"> Your age</h3>
                    </label>
                    <input name="age" id="age" className="info-user__indentity__input body valide" placeholder="how old are you ?" />
                  </span>
                  <span className="info-user__indentity__input">
                    <label htmlFor="beverage">
                      <h3 className="title-1"> your favorite beverage </h3>
                    </label>
                    <input
                      name="beverage"
                      id="beverage"
                      type="text"
                      placeholder="your favorite beverage"
                      className="info-user__indentity__input body"
                      value={infoProfile.beverage}
                      onChange={handleChange}
                    />
                  </span>
                </p>
                <p className="info-user__name">
                  <span className="info-user__indentity__input">
                    <label htmlFor="sexual_preference">
                      <h3 className="title-1"> what do you prefere</h3>
                    </label>
                    <input
                      type="text"
                      id="sexual_preference"
                      name="sexual_preference"
                      className="info-user__indentity__input body"
                      placeholder="what do you prefer"
                      value={infoProfile.sexual_preference}
                      onChange={handleChange}
                    />
                  </span>
                  {/* <input name='tags' type='text' value={infoProfile.tags.join(',infoProfile.')} onChange={handleChange} />  */}
                  <span className="info-user__indentity__input">
                    <label htmlFor="gender">
                      <h3 className="title-1"> your gender</h3>
                    </label>
                    <input name="gender" id="gender" type="text" placeholder="your gender" className="info-user__indentity__input body" value={infoProfile.gender} onChange={handleChange} />
                  </span>
                </p>
                <span className="info-user__indentity__input">
                  <label htmlFor="email">
                    <h3 className="title-1"> your email</h3>
                  </label>
                  <input type="email" id="email" name="email" placeholder="your email" className="info-user__indentity__input body" value={infoProfile.email} onChange={handleChange} />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="body__description">
          <h3 className="title-1"> Description </h3>
          <textarea name="description" value={infoProfile.description} onChange={handleChange} className="body__description-text" placeholder="tell us about you ? :)" />
        </div>
        <div className="body-picture">
          <label htmlFor="image-description" className="title-1">
            upload your photo
          </label>
          <input type="file" id="image-description" accept="image/*" multiple onChange={handleMultipleFile} />
          <div id="body-picture-list" className="body-picture-list"></div>
          {/* {img.map((elem, index) => {
            return <img key={index} alt={`img-user${index}`} src={elem} />;
          })} */}
        </div>
        <button onClick={saveProfile}> save</button>
      </div>
    </div>
  );
}
