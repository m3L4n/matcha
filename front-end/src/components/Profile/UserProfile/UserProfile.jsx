import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchUser from "../fetchUser";
import { useQuery, useMutation } from "@tanstack/react-query";
import fetchLocalisation from "../CreateProfil/fetchLocalisation";
import fetchLocalisationiWithoutKnow from "../fetchLocalisationWithoutKnow";
import LayoutUserProfile from "../layoutUserProfil/LayoutUserProfile";
export default function UserProfile({ allEnumData }) {
  const { id } = useParams();
  const { data: userInformationData, isLoading: userLoading } = useQuery(["id", id], fetchUser);
  const userInformation = userLoading
    ? {
        username: "",
        firstname: "",
        lastname: "",
        gender: "",
        rate_fame: 0,
        sexual_preference: "",
        email: "",
        beverage: "",
        city: "",
        pictures: [],
        profile_picture: "",
        tags: [],
        age: 0,
        description: "",
        position: "",
      }
    : userInformationData.result;

  const [infoProfile, setInfoProfil] = useState({
    firstname: userInformation.firstname,
    lastname: userInformation.lastname,
    username: userInformation.username,
    gender: userInformation.gender,
    sexual_preference: userInformation.sexual_preference,
    email: userInformation.email,
    beverage: userInformation.beverage,
    pictures: userInformation.pictures,
    profile_picture: userInformation.profile_picture,
    description: userInformation.description,
    tags: userInformation.tags,
    age: userInformation.age,
    rate_fame: userInformation.rate_fame,
    position: userInformation.position,
    city: userInformation.city,
  });

  useEffect(() => {
    if (!userLoading) {
      setInfoProfil({
        firstname: userInformation.firstname,
        username: userInformation.username,
        lastname: userInformation.lastname,
        gender: userInformation.gender,
        sexual_preference: userInformation.sexual_preference,
        email: userInformation.email,
        beverage: userInformation.beverage,
        pictures: userInformation.pictures,
        profile_picture: userInformation.profile_picture,
        description: userInformation.description,
        tags: userInformation.tags,
        age: userInformation.age,
        rate_fame: userInformation.rate_fame,
        city: userInformation.city,
        position: userInformation.position,
      });
    }
  }, [userLoading]);

  const mutationLocalisation = useMutation(fetchLocalisation);
  const mutationLocalisationNoneKnow = useMutation(fetchLocalisationiWithoutKnow);
  const getLocation = async () => {
    const geoSuccess = async (position) => {
      await mutationLocalisation.mutate(position.coords);
    };
    const geoError = async () => {
      await mutationLocalisationNoneKnow.mutate("localisation");
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  };
  function handleChange(event) {
    console.log(event.target.name, event.target.value);
  }
  const coords = mutationLocalisation.isLoading ? {} : mutationLocalisation.data;
  const coordKnowNone = mutationLocalisationNoneKnow.isLoading ? {} : mutationLocalisationNoneKnow.data;
  return (
    <div>
      {userLoading ? <p>loading</p> : <LayoutUserProfile {...infoProfile} ourProfile={true} allEnumData={allEnumData} handleChange={handleChange} />}
      UserProfile
      <button onClick={getLocation}> change localisation</button>
      {coords ? coords?.city : coordKnowNone?.city}
    </div>
  );
}
