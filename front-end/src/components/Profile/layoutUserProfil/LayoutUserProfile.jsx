import React, { useEffect, useState } from "react";
import "./LayoutUserProfile.scoped.css";
import { CiEdit } from "react-icons/ci";
import anonymous from "assets/_.jpeg";
import { IoMaleFemaleSharp, IoFemale, IoMaleSharp } from "react-icons/io5";
import { MdQuestionMark } from "react-icons/md";
import { FaFemale, FaMale } from "react-icons/fa";
import { notify } from "components/Global/toast-notify";
import { checkMymeType } from "components/Global/checkMymeType";
import { isValidEmail } from "src/components/Global/check-email";
import LikeButton from "src/components/Global/LikeButton/LikeButton";
export default function LayoutUserProfile({
  id,
  firstname,
  lastname,
  username,
  email,
  tags,
  gender,
  beverage,
  pictures,
  connected,
  profile_picture,
  age,
  sexual_preference,
  description,
  rate_fame,
  position,
  city,
  ourProfile,
  allTags,
  handleChange,
  getLocation,
  updatePictures,
  saveProfile,
  blockUser,
  relationship,
  reportAsFakeAccount,
}) {
  function showPreview(event) {
    if (checkMymeType(event.target.files[0]) > 0) {
      handleChange(event);
    }
  }

  function handleMultipleFile(event) {
    if (checkMymeType(event.target.files[0]) > 0) {
      const clone = structuredClone(pictures);
      if (clone.length >= 4) {
        notify("warning", "you cant have more than 4 image");
        return;
      }
      clone.push(event.target.files[0]);
      updatePictures(clone);
      notify("success", "upload successfull");
      return;
    }
  }

  const deleteImage = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    if (value == undefined) {
      value = event.currentTarget.value;
    }
    if (name == undefined) {
      name = event.currentTarget.name;
    }
    const tmpPictures = structuredClone(pictures);
    tmpPictures.splice(value, 1);
    updatePictures(tmpPictures);
  };

  const ShowImage = (elem, index) => {
    let preview = elem;
    if (elem instanceof File) {
      preview = URL.createObjectURL(elem);
    }
    return (
      <div className="container-picture__picture">
        {ourProfile && (
          <button className="picture-delete title-1" onClick={deleteImage} value={index}>
            X
          </button>
        )}
        <img src={preview} alt="`img${index}`" />
      </div>
    );
  };
  const ShowPreviewImage = (elem) => {
    let preview = elem;
    if (elem instanceof File) {
      preview = URL.createObjectURL(elem);
    }
    return <img alt="profile-picture" name="profile_picture" id="profile-picture" src={preview} className="info-user_profile-picture" />;
  };
  const triggerControlInput = (event, needAdd) => {
    const name = event.target.name;
    const divControlled = document.querySelector(`#controlled_input_${name}`);
    if (divControlled) {
      if (needAdd) {
        divControlled.classList.add("input-focused");
      } else {
        divControlled.classList.remove("input-focused");
      }
    }
  };
  const handleEmail = (event) => {
    const divControlled = document.querySelector(`#controlled_input_email`);
    if (divControlled) {
      if (isValidEmail(event.target.value)) {
        divControlled.classList.remove("input-wrong");
        divControlled.classList.add("input-focused");
      } else {
        divControlled.classList.add("input-wrong");
      }
      handleChange(event);
    }
  };

  const handleAge = (event) => {
    const number = Number(event.target.value);
    const divControlled = document.querySelector(`#controlled_input_age`);
    if (divControlled) {
      if (Number.isNaN(number) || number < 18 || number > 99) {
        divControlled.classList.add("input-wrong");
      } else {
        divControlled.classList.remove("input-wrong");
        divControlled.classList.add("input-focused");
        event.target.value = Number(number);
      }
      handleChange(event);
    }
  };
  return (
    <div className="containerLayout">
      <div className="containerLayout-body">
        <div className="Lcontainer_userInfo">
          {!ourProfile &&
            (!relationship.block ? (
              <button className="Lcontainer_userInfo-block" onClick={() => blockUser(id, true)}>
                blocker
              </button>
            ) : (
              <button className="Lcontainer_userInfo-block" onClick={() => blockUser(id, false)}>
                deblocker
              </button>
            ))}
          {!ourProfile && (
            <button onClick={() => reportAsFakeAccount(id)} className="Lcontainer_userInfo-fakeAccount ">
              {" "}
              report as fake account
            </button>
          )}
          <h3 className="Lcontainer_userInfo-connected"> {connected ? "en ligne" : "deconnecte"}</h3>
          <div className="Lcontainer_userInfo__header">
            <div className="containerInfo-user__profile-img">
              {ShowPreviewImage(profile_picture)}
              {ourProfile ? (
                <label htmlFor="file-ip-1" className="profile-image__label">
                  <CiEdit size={16} />
                </label>
              ) : (
                !relationship.block && (
                  <div className="profile-image__like">
                    <LikeButton id={id} width={"3rem"} height={"3rem"} sizeIcon={16} like={relationship.like} />
                  </div>
                )
              )}
              <input type="file" id="file-ip-1" name="profil_picture" accept="image/*" onChange={showPreview} disabled={ourProfile ? false : true} />
            </div>
            {/* <div className="userInfo__header-identity"> */}
            <h1 className="title-1 Lcontainer_userInfo__header-title">{`@${username}`}</h1>
            <p className="title-1 Lcontainer_userInfo__header-title"> {rate_fame} Points</p>
            <p className="title-1 Lcontainer_userInfo__header-title">{city}</p>
            {/* </div> */}
            {ourProfile && (
              <button onClick={getLocation} className="button-location">
                Update position
              </button>
            )}
          </div>
          <form className="Lcontainer_userInfo-form">
            <span className="userInfo-form__span">
              <label className="form-label">
                <p className="userInfo-form_label title-1"> Firstname</p>
                <input
                  className="userInfo-form_input"
                  value={firstname}
                  onChange={handleChange}
                  name="firstname"
                  onFocus={(event) => triggerControlInput(event, true)}
                  onBlur={(event) => triggerControlInput(event, false)}
                />
                <div className="controlled__input" id="controlled_input_firstname" />
              </label>
              <label>
                <p className="userInfo-form_label title-1">lastname</p>
                <input
                  className="userInfo-form_input body"
                  name="lastname"
                  value={lastname}
                  onChange={handleChange}
                  onFocus={(event) => triggerControlInput(event, true)}
                  disabled={ourProfile ? false : true}
                  onBlur={(event) => triggerControlInput(event, false)}
                />
                <div className="controlled__input" id="controlled_input_lastname" />
              </label>
            </span>
            <span className="userInfo-form__span">
              <label>
                <p className="userInfo-form_label title-1"> age</p>
                <input
                  className="userInfo-form_input body"
                  name="age"
                  type="number"
                  value={age}
                  onChange={handleAge}
                  disabled={ourProfile ? false : true}
                  onFocus={(event) => triggerControlInput(event, true)}
                  onBlur={(event) => triggerControlInput(event, false)}
                />
                <div className="controlled__input" id="controlled_input_age" />
              </label>
              <label className="userInfo-form_cont-label">
                <p className="userInfo-form_label title-1"> email</p>
                <input
                  className="userInfo-form_input body"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  onFocus={(event) => triggerControlInput(event, true)}
                  onBlur={(event) => triggerControlInput(event, false)}
                  disabled={ourProfile ? false : true}
                />
                <div className="controlled__input" id="controlled_input_email" />
              </label>
            </span>
            <span className="userInfo-form__span">
              <span className="userInfo-form__span">
                <p className="userInfo-form_label title-1"> preference </p>
                <div className="userInfo-form__container-button">
                  <button
                    value={"female"}
                    name="sexual_preference"
                    className={sexual_preference == "female" ? "button-select active" : "button-select"}
                    onClick={handleChange}
                    disabled={ourProfile ? false : true}
                  >
                    <IoFemale />
                  </button>{" "}
                  <button
                    value={"male"}
                    name="sexual_preference"
                    className={sexual_preference == "male" ? "button-select active" : "button-select"}
                    onClick={handleChange}
                    disabled={ourProfile ? false : true}
                  >
                    <IoMaleSharp />
                  </button>
                  <button
                    value={"both"}
                    name="sexual_preference"
                    className={sexual_preference == "both" ? "button-select active" : "button-select"}
                    onClick={handleChange}
                    disabled={ourProfile ? false : true}
                  >
                    <IoMaleFemaleSharp />
                  </button>
                </div>
              </span>
              <span className="userInfo-form__span">
                <p className="userInfo-form_label title-1"> your gender</p>
                <div className="userInfo-form__container-button">
                  <button value={"female"} name="gender" className={gender == "female" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                    <FaFemale />
                  </button>
                  <button value={"male"} name="gender" className={gender == "male" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                    <FaMale />
                  </button>
                  <button value={"other"} name="gender" className={gender == "other" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                    <MdQuestionMark />
                  </button>
                </div>
              </span>
            </span>
            <span className="userInfo-form__span">
              <label></label>
              <p className="userInfo-form_label title-1"> your favorite beverage</p>
              <button
                value={"coffee"}
                name="beverage"
                className={beverage == "coffee" ? "button-select active body " : "button-select body"}
                onClick={handleChange}
                disabled={ourProfile ? false : true}
              >
                coffee
              </button>
              <button
                value={"matcha"}
                name="beverage"
                className={beverage == "matcha" ? "button-select active body" : "button-select body"}
                onClick={handleChange}
                disabled={ourProfile ? false : true}
              >
                matcha
              </button>
            </span>
          </form>
        </div>
        <div className="Lcontainer-userTags">
          <h3 className="title-1"> Tags </h3>
          <ul className="lcontainer-usertags-ul">
            {allTags?.map((elem, index) => {
              return (
                <button
                  key={index}
                  value={elem.tag_name}
                  name="tags"
                  className={tags?.findIndex((tag) => tag == elem.tag_name) > -1 ? "button-select active body" : "button-select body"}
                  onClick={handleChange}
                  disabled={ourProfile ? false : true}
                >
                  {elem.tag_name}
                </button>
              );
            })}
          </ul>
        </div>
        <div className="Lcontainer-userDescription">
          <h3 className="title-1"> Description </h3>
          <textarea
            name="description"
            value={description}
            className="Lcontainer-userDescription-text body"
            placeholder="tell us about you ? :)"
            disabled={ourProfile ? false : true}
            onChange={handleChange}
          />
        </div>
        <div className="Lcontainer-userPictures">
          {ourProfile && (
            <>
              <label htmlFor="image-description" className="title-1">
                upload your photo
              </label>
              <input type="file" id="image-description" accept="image/*" multiple disabled={ourProfile ? false : true} onChange={handleMultipleFile} />
            </>
          )}
          <div id="body-picture-list" className="container-picture">
            {pictures?.map((elem, index) => {
              return ShowImage(elem, index);
            })}
          </div>
        </div>
        {ourProfile && (
          <button onClick={saveProfile} className="button-save title-1">
            {" "}
            save
          </button>
        )}
      </div>
    </div>
  );
}
