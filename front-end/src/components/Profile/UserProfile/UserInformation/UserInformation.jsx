import React from "react";
import { CiEdit } from "react-icons/ci";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { checkMymeType } from "components/Global/checkMymeType";
import LikeButton from "src/components/Global/LikeButton/LikeButton";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
import "./UserInformation.scoped.css";
import UserDescription from "./UserDescription/UserDescription";
import UserTags from "./UserTags/UserTags";
import UserPictures from "./UserPictures/UserPictures";
import UserLocalisation from "./UserLocalisation/UserLocalisation";
import UserForm from "./UserForm/UserForm";
export default function UserInformation({
  userInformation,
  ourProfile,
  handleChange,
  relationship,
  profilPicture,
  allTags,
  pictureDescription,
  updatePictures,
  updateLocationInput,
  getLocation,
  locationInput,
  blockUser,
  reportAsFakeAccount,
}) {
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
      return <img alt="main" name="profile_picture" id="profile-picture" src={preview} className="profile-picture" />;
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
  const InformationNotOurProfile = () => {
    return (
      <>
        <p className="body">
          {userInformation.firstname} {userInformation.lastname}, {userInformation.age}
        </p>
        <p className="body"> {userInformation.gender}</p>
        <span className="information-line-row">
          <p className="body"> sexual preference : {userInformation.sexual_preference}</p>
          <p className="body"> favorite beverage : {userInformation.beverage}</p>
        </span>
        <span>
          {" "}
          tags{" "}
          {userInformation.tags?.map((elem) => {
            console.log(elem);
          })}
        </span>
      </>
    );
  };
  return (
    <div className="container-user-information">
      <header className="container-user-information-header">
        <PictureProfileUser />
        <div className="container-user-information-text">
          <h2 className="title-1"> @{userInformation.username}</h2>
          <p className="body-highlight"> {userInformation.city}</p>
          <p className="body-highlight"> {ourProfile ? "en ligne " : userInformation.connected ? "en ligne" : "deconnecte"}</p>
          <p className="body-highlight"> {userInformation.rate_fame} points</p>
          {!ourProfile && <InformationNotOurProfile />}
        </div>
      </header>
      {!ourProfile && (
        <span>
          <button onClick={blockUser}> block</button>
          <button onClick={reportAsFakeAccount}> report as fake account</button>
        </span>
      )}
      <span>
        <p className="body">last connexion : {d2}</p>
        <p className="body">reported as fake account : {userInformation.fake_account} times</p>
      </span>
      <div className="container-user-information-body">
        {ourProfile && (
          <>
            <UserForm ourProfile={ourProfile} handleChange={handleChange} userInformation={userInformation} />
            <UserLocalisation updateLocationInput={updateLocationInput} getLocation={getLocation} ourProfile={ourProfile} locationInput={locationInput} />
            <UserTags allTags={allTags} tags={userInformation.tags} handleChange={handleChange} ourProfile={ourProfile} />
          </>
        )}

        <UserDescription userInformation={userInformation} handleChange={handleChange} ourProfile={ourProfile} />
        <UserPictures pictureDescription={pictureDescription} ourProfile={ourProfile} updatePictures={updatePictures} />
      </div>
    </div>
  );
}
