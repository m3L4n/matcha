import React from "react";
import "./LayoutUserProfile.scoped.css";
import { CiEdit } from "react-icons/ci";
import anonymous from "assets/_.jpeg";
import { IoMaleFemaleSharp, IoFemale, IoMaleSharp } from "react-icons/io5";
import { MdQuestionMark } from "react-icons/md";
import { FaFemale, FaMale } from "react-icons/fa";

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
  allEnumData,
  handleChange,
}) {
  return (
    <div className="containerLayout">
      <div className="containerLayout__body">
        <div className="containerInfo-user">
          <h1 className="title-1 ">
            {`@${username}`} {rate_fame} position {ourProfile && <button> change position</button>}
          </h1>
          <div className="containerInfo-user__body">
            <div className="containerInfo-user__profile-img">
              <img alt="profile-picture" id="profile-picture" src={profile_picture ? profile_picture : anonymous} className="info-user_profile-picture" />
              <label htmlFor="file-ip-1" className="profile-image__label">
                <CiEdit />
              </label>
              <input type="file" id="file-ip-1" accept="image/*" />
            </div>
            <div className="containerInfo-user__form">
              <div className="info-user__name">
                <div className="containerInfo-user__form-input">
                  <label htmlFor="firstname">
                    <h3 className="title-1"> Your name</h3>
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={firstname}
                    className="containerInfo-user__form-input body"
                    disabled={ourProfile ? false : true}
                    onChange={handleChange}
                  />{" "}
                </div>
                <span className="containerInfo-user__form-input">
                  <label htmlFor="lastname">
                    <h3 className="title-1"> Your last name</h3>
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={lastname}
                    className="containerInfo-user__form-input body"
                    placeholder="whats your lastname ?"
                    disabled={ourProfile ? false : true}
                    onChange={handleChange}
                  />{" "}
                </span>
              </div>
              <div className="info-user__name">
                <span className="containerInfo-user__form-input">
                  <label htmlFor="age">
                    <h3 className="title-1"> Your age</h3>
                  </label>
                  <input
                    name="age"
                    id="age"
                    value={age}
                    className="containerInfo-user__form-input body valide"
                    placeholder="how old are you ?"
                    disabled={ourProfile ? false : true}
                    onChange={handleChange}
                  />
                </span>
                <span className="containerInfo-user__form-input">
                  <label htmlFor="beverage">
                    <h3 className="title-1"> your favorite beverage </h3>
                  </label>
                  <button value={"coffee"} name="beverage" className={beverage == "coffee" ? "button-select active" : "button-select"} onClick={handleChange}>
                    coffee{" "}
                  </button>{" "}
                  <button value={"matcha"} name="beverage" className={beverage == "matcha" ? "button-select active" : "button-select"} onClick={handleChange}>
                    {" "}
                    matcha
                  </button>
                </span>
              </div>
              <div className="info-user__name">
                <span className="containerInfo-user__form-input">
                  <label htmlFor="sexual_preference">
                    <h3 className="title-1"> what do you prefere</h3>
                  </label>
                  <button value={"female"} name="sexual_preference" className={sexual_preference == "female" ? "button-select active" : "button-select"} onClick={handleChange}>
                    {" "}
                    <IoFemale />
                  </button>{" "}
                  <button value={"male"} name="sexual_preference" className={sexual_preference == "male" ? "button-select active" : "button-select"} onClick={handleChange}>
                    <IoMaleSharp />
                  </button>
                  <button value={"both"} name="sexual_preference" className={sexual_preference == "both" ? "button-select active" : "button-select"} onClick={handleChange}>
                    <IoMaleFemaleSharp />
                  </button>
                </span>
                <span className="containerInfo-user__form-input">
                  <label htmlFor="gender">
                    <h3 className="title-1"> your gender</h3>
                  </label>
                  <button value={"female"} name="gender" className={gender == "female" ? "button-select active" : "button-select"}>
                    <FaFemale />
                  </button>
                  <button value={"male"} name="gender" className={gender == "male" ? "button-select active" : "button-select"}>
                    <FaMale />
                  </button>
                  <button value={"other"} name="gender" className={gender == "other" ? "button-select active" : "button-select"}>
                    <MdQuestionMark />
                  </button>
                </span>
              </div>
              <span className="containerInfo-user__form-input">
                <label htmlFor="email">
                  <h3 className="title-1"> your email</h3>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="your email"
                  className="containerInfo-user__form-input body"
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
            {allEnumData?.enumTags?.map((elem, index) => {
              return (
                <button key={index} value={elem} name="tags" className="button-select" onClick={handleChange}>
                  {elem}
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
              <input type="file" id="image-description" accept="image/*" multiple />
            </>
          )}
          <div id="body-picture-list" className="body-picture-list"></div>
          {pictures?.map((elem, index) => {
            return <img key={index} alt={elem} src={elem} />;
          })}
        </div>
        {ourProfile && <button> save</button>}
      </div>
    </div>
  );
}
