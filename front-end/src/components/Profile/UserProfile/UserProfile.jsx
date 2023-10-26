import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import fetchLocalisation from "components/Profile//fetch/fetchLocalisation";
import { notify } from "components/Global/toast-notify";
import fetchUpdateInfo from "components/Profile/fetch/fetchUpdateInfo";
import fetchUploadprofilPicture from "../fetch/fetchUploadProfilePicture";
import fetchUploadPictureDescription from "../fetch/fetchUploadPictureDescription";
import { isValidEmail } from "src/components/Global/check-email";
import fetchLocalisationiWithoutKnow from "components/Profile/fetch/fetchLocalisationWithoutKnow";
import anonymous from "assets/_.jpeg";
import LayoutUserProfile from "../layoutUserProfil/LayoutUserProfile";
import fetchBlockUser from "../fetch/fetchBlockUser";
import fetchReportFakeAccount from "../fetch/fetchReportFakeAccount";
export default function UserProfile({
  allTags,
  userInformation,
  ourProfile,
  relationship,
  connected
}) {
  const mutationUpdateInfo = useMutation(fetchUpdateInfo);
  const mutationUploadPP = useMutation(fetchUploadprofilPicture);
  const mutationUploadPD = useMutation(fetchUploadPictureDescription);
  const mutationReportFakeAccount = useMutation(fetchReportFakeAccount);
  const mutationLocalisation = useMutation(fetchLocalisation);
  const mutationLocalisationNoneKnow = useMutation(
    fetchLocalisationiWithoutKnow
  );
  const mutationBlockUser = useMutation(fetchBlockUser);

  const coords = mutationLocalisation.isLoading
    ? {}
    : mutationLocalisation.data;
  const coordKnowNone = mutationLocalisationNoneKnow.isLoading
    ? {}
    : mutationLocalisationNoneKnow.data;

  const [pictureDescription, setPicturesDescription] = useState([]);
  const [profilPicture, setProfilPicture] = useState("");
  const [infoProfile, setInfoProfil] = useState({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (userInformation) {
      if (Object.keys(userInformation).length > 0) {
        fillInfoProfile(userInformation);
      }
    }
  }, [userInformation]);

  useEffect(() => {
    if (!mutationLocalisation.isLoading) {
      if (coords) {
        if (Object.keys(coords).length > 0) {
          setInfoProfil({
            ...infoProfile,
            ["city"]: coords.city,
            ["position"]: { x: coords.latitude, y: coords.longitude }
          });
        }
      }
    }
  }, [coords]);

  useEffect(() => {
    if (!mutationLocalisationNoneKnow.isLoading) {
      if (coordKnowNone) {
        if (Object.keys(coordKnowNone).length > 0) {
          setInfoProfil({
            ...infoProfile,
            ["city"]: coordKnowNone.city,
            ["position"]: {
              x: coordKnowNone.latitude,
              y: coordKnowNone.longitude
            }
          });
        }
      }
    }
  }, [coordKnowNone]);

  const fillInfoProfile = infoUser => {
    if (Object.keys(infoUser).length > 0) {
      let infoProfileTmp = structuredClone(infoUser);
      for (const info in infoProfileTmp) {
        let parameter = infoProfileTmp[info];
        if (infoProfileTmp[info]?.length == 0 || !infoProfileTmp[info]) {
          switch (info) {
            case "gender":
              parameter = "other";
              break;
            case "beverage":
              parameter = "matcha";
              break;
            case "tags":
              parameter = [];
              break;
            case "description":
              parameter = "";
              break;
            case "age":
              parameter = 18;
              break;
            case "profile_picture":
              setProfilPicture(anonymous);
              break;
            case "pictures":
              setPicturesDescription([]);
              break;
            case "sexual_preference":
              parameter = "both";
              break;
            default:
              break;
          }
        } else if (info == "profile_picture") {
          setProfilPicture(infoProfileTmp[info]);
        } else if (info == "pictures") {
          setPicturesDescription(infoProfileTmp[info]);
        }
        if (info != "profile_picture" && info != "pictures") {
          infoProfileTmp[info] = parameter;
        }
      }
      setUserId(infoProfileTmp["id"]);
      setInfoProfil(infoProfileTmp);
    }
  };
  const getLocation = async () => {
    const geoSuccess = async position => {
      await mutationLocalisation.mutate(position.coords);
    };
    const geoError = async () => {
      await mutationLocalisationNoneKnow.mutate("localisation");
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  };

  function handleChange(event) {
    event.preventDefault();
    let value = event.target.value;
    let name = event.target.name;
    if (value == undefined) {
      value = event.currentTarget.value;
    }
    if (name == undefined) {
      name = event.currentTarget.name;
    }
    if (name == "profil_picture") {
      setProfilPicture(event.target.files[0]);
      return;
    } else if (name == "tags") {
      let tmpTags = JSON.parse(JSON.stringify(infoProfile.tags));
      const index = tmpTags.findIndex(elem => elem == value);
      if (index == -1) {
        tmpTags.push(value);
      } else {
        tmpTags.splice(index, 1);
      }
      setInfoProfil({ ...infoProfile, [name]: tmpTags });
      return;
    }

    setInfoProfil({ ...infoProfile, [name]: value });
  }

  const updatePictures = arrayPicture => {
    setPicturesDescription(arrayPicture);
  };
  function saveProfile() {
    if (pictureDescription.length > 4 || pictureDescription.length < 4) {
      notify(
        "error",
        "you dont the right number of picture description, the number is 4"
      );
      return;
    } else if (profilPicture.length <= 0 || profilPicture == anonymous) {
      notify("error", "you must have profile picture");
      return;
    }
    if (!isValidEmail(infoProfile.email)) {
      notify("error", "you must have valid email");
      return;
    }
    if (
      infoProfile.age < 18 ||
      !infoProfile.beverage ||
      !infoProfile.firstname ||
      !infoProfile.lastname ||
      !infoProfile.email ||
      !infoProfile.sexual_preference ||
      infoProfile.tags.length < 5 ||
      infoProfile.description.length == 0 ||
      !infoProfile.city ||
      !infoProfile.position ||
      infoProfile.rate_fame < 0
    ) {
      notify(
        "error",
        "you cant save you profile you need to fill all the input"
      );
      return;
    }

    if (profilPicture instanceof File) {
      mutationUploadPP.mutate(profilPicture);
    }
    let infoProfileWithoutPicture = { ...infoProfile };
    delete infoProfileWithoutPicture["profile_pictures"];
    delete infoProfileWithoutPicture["pictures"];

    mutationUploadPD.mutate(pictureDescription);
    mutationUpdateInfo.mutate(infoProfileWithoutPicture);
    notify("success", " account modfy");
  }

  const blockUser = (id, block) => {
    mutationBlockUser.mutate({ id, block });
  };
  const reportAsFakeAccount = id => {
    mutationReportFakeAccount.mutate({ id });
  };
  return (
    <div>
      <LayoutUserProfile
        {...infoProfile}
        id={userId}
        pictures={pictureDescription}
        profile_picture={profilPicture}
        ourProfile={ourProfile}
        allTags={allTags}
        handleChange={handleChange}
        getLocation={getLocation}
        updatePictures={updatePictures}
        saveProfile={saveProfile}
        blockUser={blockUser}
        relationship={relationship}
        reportAsFakeAccount={reportAsFakeAccount}
        connected={connected}
      />
    </div>
  );
}
