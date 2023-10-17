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
import { socket } from "src/socket/socket";
import GlobalLoading from "../Global/GLoading/GlobalLoading";
import fetchLocalisationiWithoutKnow from "./fetch/fetchLocalisationWithoutKnow";
import fetchRelationships from "./fetch/fetchRelationship";
export default function Profile() {
  const paramId = useParams().id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: allTagsData, isLoading: allTagsLoading } = useQuery(["tags"], fetchTags);
  const { data: userInformationData, isLoading: userLoading } = useQuery(["id", paramId], fetchUser);
  const { data: relationShipData, isLoading: relationShipLoading } = useQuery(["relation", paramId], fetchRelationships);
  const [ourProfile, setOurProfil] = useState(false);
  const userInformation = userLoading ? {} : userInformationData.result;
  const [connected, setConnected] = useState(false);
  // let connected = false;
  useEffect(() => {
    if (!paramId) {
      navigate("/match");
      return notify("warning", "you cant access user profile like this");
    }
  }, []);

  // useEffect(() => {
  //   if (Object.keys(userInformation).length > 0) {
  //     // connected = userInformation.connected;
  //   }
  // }, [userInformation.connected]);
  useEffect(() => {
    socket.emit("user_profile", { userId: paramId, currentUserId: user.id, ourProfile: user.id == paramId });
    socket.on("connected", (msg) => {
      if (Object.hasOwn(msg, "connected")) {
        setConnected(msg.connected);
      }
    });
    return () => {
      setConnected(false);
      setOurProfil(false);
      socket.off("user_profile", (reason) => {});
      socket.emit("remove_listener", { name: "user_profile" });
      socket.off("connected", (reason) => {
        console.log(reason);
      });
    };
  }, [paramId]);
  useEffect(() => {
    if (paramId === user.id) {
      setOurProfil(true);
    }
  }, [paramId, user.id]);
  console.log(userInformation);
  const allTags = allTagsLoading ? [] : allTagsData.result;
  const relationship = relationShipLoading ? {} : relationShipData.result;
  return (
    <>
      {(allTagsLoading || relationShipLoading || userLoading) && <GlobalLoading />}
      {!allTagsLoading && <UserProfile allTags={allTags} userInformation={userInformation} ourProfile={ourProfile} relationship={relationship} connected={connected} />}
    </>
  );
}
