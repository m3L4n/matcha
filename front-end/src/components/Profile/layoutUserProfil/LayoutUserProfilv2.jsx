import React, { useEffect, useState } from "react";
import "./LayoutUserProfile.scoped.css";
import PropTypes, { element } from "prop-types";
import UserTags from "./UserTags/UserTags";
import UserDescription from "./UserDescription/UserDescription";
import UserPictures from "./UserPictures/UserPictures";
import UserInformation from "./UserInformation/UserInformation";

export default function LayoutUserProfilev2({
  userInformation,
  relationship,
  pictureDescription,
  profilPicture,
  allTags,
  ourProfile,
  locationInput,
  saveProfile,
  getLocation,
  updatePictures,
  blockUser,
  reportAsFakeAccount,
  updateLocationInput,
  handleChange,
}) {
  return (
    <div className="container-layout">
      <header className="container-layout__header">
        <h1 className="header">PROFILE</h1>
      </header>
      <UserInformation userInformation={userInformation} handleChange={handleChange} ourProfile={ourProfile} profilPicture={profilPicture} relationship={relationship} />
      <UserDescription userInformation={userInformation} handleChange={handleChange} ourProfile={ourProfile} />
      <UserTags allTags={allTags} tags={userInformation.tags} handleChange={handleChange} ourProfile={ourProfile} />
      <UserPictures pictureDescription={pictureDescription} ourProfile={ourProfile} updatePictures={updatePictures} />
      {ourProfile && (
        <button onClick={saveProfile} className="button-save title-1">
          save
        </button>
      )}
    </div>
  );
}

LayoutUserProfilev2.propTypes = {
  userInformation: PropTypes.shape({
    id: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    lasted_connection: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    gender: PropTypes.string,
    beverage: PropTypes.string,
    pictures: PropTypes.arrayOf(PropTypes.string),
    connected: PropTypes.bool,
    profile_picture: PropTypes.string,
    age: PropTypes.number,
    sexual_preference: PropTypes.string,
    description: PropTypes.string,
    rate_fame: PropTypes.number,
    city: PropTypes.string,
    fake_account: PropTypes.number,
  }),
  allTags: PropTypes.arrayOf(PropTypes.string),
  ourProfile: PropTypes.bool,
  relationship: PropTypes.shape({
    block: PropTypes.bool,
    like: PropTypes.bool,
  }),
  locationInput: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  saveProfile: PropTypes.func,
  blockUser: PropTypes.func,
  updateLocationInput: PropTypes.func,
  reportAsFakeAccount: PropTypes.func,
  updatePictures: PropTypes.func,
  handleChange: PropTypes.func,
  getLocation: PropTypes.func,
};
