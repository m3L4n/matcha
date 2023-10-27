import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { IoMaleFemaleSharp, IoFemale, IoMaleSharp } from "react-icons/io5";
import { MdQuestionMark } from "react-icons/md";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { FaFemale, FaMale } from "react-icons/fa";
import { BsCupStraw, BsFillSuitHeartFill } from "react-icons/bs";
import { BiCoffeeTogo } from "react-icons/bi";
import { checkMymeType } from "components/Global/checkMymeType";
import LikeButton from "src/components/Global/LikeButton/LikeButton";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import PropTypes, { element } from "prop-types";
import InputProfile from "src/components/Global/InputProfile/InputProfile";
import MultipleButtonProfile from "src/components/Global/MultipleButtonProfile/MultipleButtonProfile";
import "./UserInformation.scoped.css";
export default function UserInformation({ userInformation, ourProfile, handleChange, relationship, profilPicture }) {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localizedFormat);
  dayjs.tz.guess();
  const d2 = dayjs(userInformation.latest_connection).format("llll");

  const PictureProfileUser = () => {
    function HandleChangeProfilePicture(event) {
      if (checkMymeType(event.target.files[0]) > 0) {
        handleChange(event);
      }
    }
    const ShowPreviewImage = (elem) => {
      let preview = elem;
      if (elem instanceof File) {
        preview = URL.createObjectURL(elem);
      }
      return <img alt="profile-picture" name="profile_picture" id="profile-picture" src={preview} className="profile-picture" />;
    };

    return (
      <div className="container__profile-picture">
        {ShowPreviewImage(profilPicture)}
        {ourProfile ? (
          <>
            <label htmlFor="file-ip-1" className="profile-picture__label">
              <CiEdit size={16} />
            </label>
            <input type="file" id="file-ip-1" name="profil_picture" className="input-file" accept="image/*" onChange={HandleChangeProfilePicture} disabled={ourProfile ? false : true} />
          </>
        ) : (
          !relationship.block && (
            <div className="profile-picture__like">
              <LikeButton id={userInformation.id} width={"3rem"} height={"3rem"} sizeIcon={16} likeProps={relationship.like} />
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="container__card-user-information">
      <div className="container__card-header">
        <PictureProfileUser />
        <div className="user-information-title">
          <span className="user-information-title-name">
            <h2 className="title-1"> @{userInformation.username}</h2>
            <p className="body-highlight"> {userInformation.city}</p>
            <h3 className="body-highlight"> {ourProfile ? "en ligne " : userInformation.connected ? "en ligne" : "deconnecte"}</h3>
          </span>
          <p className="body-highlight"> {userInformation.rate_fame} points</p>
        </div>
      </div>
      <div className="container__card-body">
        <div className="container__userInformation__form">
          <span className="container__userInformation__form-pair">
            <InputProfile name="firstname" label={ourProfile ? "Your firstname" : "firstname"} type="text" value={userInformation.firstname} handleInput={handleChange} ourProfile={ourProfile} />
            <InputProfile name="lastname" label={ourProfile ? "Your lastname" : "lastname"} type="text" value={userInformation.lastname} handleInput={handleChange} ourProfile={ourProfile} />
          </span>
          <span className="container__userInformation__form-pair">
            <InputProfile name="email" label={ourProfile ? "Your email" : "email"} type="text" value={userInformation.email} handleInput={handleChange} ourProfile={ourProfile} />
            <InputProfile name="age" label={ourProfile ? "Your age" : "age"} type="number" value={userInformation.age} handleInput={handleChange} ourProfile={ourProfile} />
            <span className="container__userInformation__form-pair">
              <MultipleButtonProfile
                name={"sexual_preference"}
                label={ourProfile ? "Your preference" : "preference"}
                value={userInformation.sexual_preference}
                ourProfile={ourProfile}
                handleChoose={handleChange}
                arrayObjectValue={[
                  { value: "female", Icon: <IoFemale /> },
                  { value: "male", Icon: <IoMaleSharp /> },
                  { value: '"both"', Icon: <IoMaleFemaleSharp /> },
                ]}
              />
              <MultipleButtonProfile
                name={"gender"}
                label={ourProfile ? "Your gender" : "gender"}
                value={userInformation.gender}
                ourProfile={ourProfile}
                handleChoose={handleChange}
                arrayObjectValue={[
                  { value: "female", Icon: <FaFemale /> },
                  { value: "male", Icon: <FaMale /> },
                  { value: '"other"', Icon: <MdQuestionMark /> },
                ]}
              />
              <MultipleButtonProfile
                name={"beverage"}
                label={ourProfile ? "Your Favorite beverage" : "Favorite beverage"}
                value={userInformation.beverage}
                ourProfile={ourProfile}
                handleChoose={handleChange}
                arrayObjectValue={[
                  {
                    value: "matcha",
                    Icon: (
                      <div>
                        matcha
                        <BsCupStraw />
                      </div>
                    ),
                  },
                  {
                    value: "coffee",
                    Icon: (
                      <div>
                        coffee
                        <BiCoffeeTogo />
                      </div>
                    ),
                  },
                ]}
              />
            </span>
          </span>
          {/* <div>
            <span>
              <h3 className="title-1"> Update your position</h3>
              <InputProfile type="number" name="latitude" label="latitude" />
              <InputProfile type="number" name="longitude" label="longitude" />
            </span>
            <button>update your localisation</button>
          </div> */}
          <p className="body">last connexion : {d2}</p>
          <p className="body">reported as fake account : {userInformation.fake_account} times</p>
        </div>
        {/* <p>
          <BsFillSuitHeartFill />
        </p> */}
      </div>
    </div>
  );
}
