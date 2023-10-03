import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "src/Context/AuthContext";
import CreateProfile from "./CreateProfil/CreateProfile";
import UserProfile from "./UserProfile/UserProfile";
import { notify } from "../Global/toast-notify";
import { useQuery } from "@tanstack/react-query";
import fetchEnum from "./fetchEnum";
export default function Profile() {
  const paramId = useParams().id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const allEnum = useQuery(["users"], fetchEnum);
  const [createProfile, setCreateProfile] = useState(false);

  console.log(allEnum.data);
  useEffect(() => {
    creationProfil(user);
    if (!paramId) {
      navigate("/match");
      return notify("warning", "you cant access user profile like this");
    }
  }, []);
  const allEnumData = allEnum.isLoading ? {} : allEnum.data;
  // navigator.geolocation.getCurrentPosition(positions);
  function creationProfil(user) {
    const { gender, beverage, sexual_preference, tags, description, rate_fame } = user;
    if (!gender | !beverage | !sexual_preference | !description | !rate_fame) {
      setCreateProfile(true);
    }
  }

  return (
    <>
      {createProfile && <CreateProfile />}
      {!createProfile && <UserProfile allEnumData={allEnumData} />}
    </>
  );
}
