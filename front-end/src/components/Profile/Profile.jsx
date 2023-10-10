import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "src/Context/AuthContext";
import UserProfile from "./UserProfile/UserProfile";
import { notify } from "../Global/toast-notify";
import { useQuery } from "@tanstack/react-query";
import fetchTags from "./fetch/fetchTags";
import fetchUser from "./fetch/fetchUser";
import GlobalLoading from "../Global/GLoading/GlobalLoading";
export default function Profile() {
  const paramId = useParams().id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: allTagsData, isLoading: allTagsLoading } = useQuery(["tags"], fetchTags);
  const { data: userInformationData, isLoading: userLoading } = useQuery(["id", paramId], fetchUser);
  const [ourProfile, setOurProfil] = useState(false);
  const userInformation = userLoading ? {} : userInformationData.result;

  useEffect(() => {
    if (!paramId) {
      navigate("/match");
      return notify("warning", "you cant access user profile like this");
    }
  }, []);

  useEffect(() => {
    if (paramId == user.id) {
      setOurProfil(true);
    }
  }, [paramId, user.id]);
  const allTags = allTagsLoading ? [] : allTagsData.result;

  return (
    <>
      {allTagsLoading && <GlobalLoading />}
      {!allTagsLoading && <UserProfile allTags={allTags} userInformation={userInformation} ourProfile={ourProfile} />}
    </>
  );
}
