import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "src/Context/AuthContext";
import CreateProfile from "./CreateProfil/CreateProfile";
import UserProfile from "./UserProfile/UserProfile";

export default function Profile() {
  const paramId = useParams().id;
  const {user} = useAuth();
  const [createProfile, setCreateProfile] = useState(false);

  useEffect(() => {
    creationProfil(user);
  }, [])
  function creationProfil(user){
    const {gender, beverage, sexual_preference, tags, description, rate_fame } = user;
    if (!gender| !beverage| !sexual_preference| !tags| !description| !rate_fame){
      setCreateProfile(true);
    }
  }

  return (<>
    {createProfile && <CreateProfile/>}
    {!createProfile && <UserProfile />}
    </>)
}
