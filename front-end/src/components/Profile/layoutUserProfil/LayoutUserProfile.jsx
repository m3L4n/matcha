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
export default function LayoutUserProfile({
  firstname,
  lastname,
  username,
  email,
  tags,
  gender,
  beverage,
  pictures,
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
}) {
  // console.log("anonym", allEnumData);
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
        <button className="picture-delete title-1" onClick={deleteImage} value={index}>
          X
        </button>
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
          <div className="Lcontainer_userInfo__header">
            <div className="containerInfo-user__profile-img">
              {ShowPreviewImage(profile_picture)}
              <label htmlFor="file-ip-1" className="profile-image__label">
                <CiEdit />
              </label>
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
                <p className="userInfo-form_label title-1"> your name</p>
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
                <p className="userInfo-form_label title-1">your lastname</p>
                <input
                  className="userInfo-form_input"
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
                <p className="userInfo-form_label title-1"> your age</p>
                <input
                  className="userInfo-form_input"
                  name="age"
                  type="text"
                  onChange={handleAge}
                  disabled={ourProfile ? false : true}
                  onFocus={(event) => triggerControlInput(event, true)}
                  onBlur={(event) => triggerControlInput(event, false)}
                />
                <div className="controlled__input" id="controlled_input_age" />
              </label>
              <label className="userInfo-form_cont-label">
                <p className="userInfo-form_label title-1"> your email</p>
                <input
                  className="userInfo-form_input"
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
              <label>
                <p className="userInfo-form_label title-1"> your preference </p>
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
              </label>
              <label className="userInfoForm-container-input">
                <p className="userInfo-form_label title-1"> your gender</p>
                <button value={"female"} name="gender" className={gender == "female" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                  <FaFemale />
                </button>
                <button value={"male"} name="gender" className={gender == "male" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                  <FaMale />
                </button>
                <button value={"other"} name="gender" className={gender == "other" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                  <MdQuestionMark />
                </button>
                <div className="controlled__input" id="controlled_input_gender" />
              </label>
            </span>
            <span className="userInfo-form__span">
              <label>
                <p className="userInfo-form_label title-1"> your favorite beverage</p>
                <button value={"coffee"} name="beverage" className={beverage == "coffee" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                  coffee{" "}
                </button>{" "}
                <button value={"matcha"} name="beverage" className={beverage == "matcha" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                  {" "}
                  matcha
                </button>
              </label>
            </span>
          </form>
        </div>
      </div>
      {/*<div className="containerLayout__body">
        <div className="containerInfo-user">
          <h1 className="title-1 ">
            {`@${username}`} {rate_fame} {city} {position?.x} {position?.y} {ourProfile && <button onClick={getLocation}> change position</button>}
          </h1>
          <div className="containerInfo-user__body">
            <div className="containerInfo-user__form">
              <div className="info-user__name">
                <div className="userInfo-form_label">
                  <label htmlFor="firstname">
                    <h3 className="title-1"> Your name</h3>
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={firstname}
                    className="userInfo-form_label body"
                    disabled={ourProfile ? false : true}
                    onChange={handleChange}
                  />{" "}
                </div>
                <span className="userInfo-form_label">
                  <label htmlFor="lastname">
                    <h3 className="title-1"> Your last name</h3>
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={lastname}
                    className="userInfo-form_label body"
                    placeholder="whats your lastname ?"
                    disabled={ourProfile ? false : true}
                    onChange={handleChange}
                  />{" "}
                </span>
              </div>
              <div className="info-user__name">
                <span className="userInfo-form_label">
                  <label htmlFor="age">
                    <h3 className="title-1"> Your age</h3>
                  </label>
                  <input
                    name="age"
                    id="age"
                    value={age}
                    className="userInfo-form_label body valide"
                    placeholder="how old are you ?"
                    disabled={ourProfile ? false : true}
                    onChange={handleChange}
                  />
                </span>
                <span className="userInfo-form_label">
                  <label htmlFor="beverage">
                    <h3 className="title-1"> your favorite beverage </h3>
                  </label>
                  <button value={"coffee"} name="beverage" className={beverage == "coffee" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                    coffee{" "}
                  </button>{" "}
                  <button value={"matcha"} name="beverage" className={beverage == "matcha" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                    {" "}
                    matcha
                  </button>
                </span>
              </div>
               <div className="info-user__name">
                <span className="userInfo-form_label">
                  <label htmlFor="sexual_preference">
                    <h3 className="title-1"> what do you prefere</h3>
                  </label>
                  <button
                    value={"female"}
                    name="sexual_preference"
                    className={sexual_preference == "female" ? "button-select active" : "button-select"}
                    onClick={handleChange}
                    disabled={ourProfile ? false : true}
                  >
                    {" "}
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
                </span>
                
                <span className="userInfo-form_label">
                  <label htmlFor="gender">
                    <h3 className="title-1"> your gender</h3>
                  </label>
                  <button value={"female"} name="gender" className={gender == "female" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                    <FaFemale />
                  </button>
                  <button value={"male"} name="gender" className={gender == "male" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                    <FaMale />
                  </button>
                  <button value={"other"} name="gender" className={gender == "other" ? "button-select active" : "button-select"} onClick={handleChange} disabled={ourProfile ? false : true}>
                    <MdQuestionMark />
                  </button>
                </span>
                 
              </div>
              <span className="userInfo-form_label">
                <label htmlFor="email">
                  <h3 className="title-1"> your email</h3>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="your email"
                  className="userInfo-form_label body"
                  disabled={ourProfile ? false : true}
                  onChange={handleChange}
                />
              </span>
            </div>
          </div>
        </div>
        
        <div className="body__description">
          <h3 className="title-1"> Tags </h3>
          <ul className="container__list-tags">
            {allTags?.map((elem, index) => {
              return (
                <button
                  key={index}
                  value={elem.tag_name}
                  name="tags"
                  className={tags?.findIndex((tag) => tag == elem.tag_name) > -1 ? "button-select active" : "button-select"}
                  onClick={handleChange}
                  disabled={ourProfile ? false : true}
                >
                  {elem.tag_name}
                </button>
              );
            })}
          </ul>
          <h3 className="title-1"> Description </h3>
          <textarea name="description" value={description} className="body__description-text" placeholder="tell us about you ? :)" disabled={ourProfile ? false : true} onChange={handleChange} />
        </div>
      
        <div className="body-picture">
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
        {ourProfile && <button onClick={saveProfile}> save</button>}
      </div>*/}
    </div>
  );
}
