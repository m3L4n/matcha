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
// import fetchLocalisationiWithoutKnow from "./fetch/fetchLocalisationWithoutKnow";
import { useMutation } from "@tanstack/react-query";
import fetchRelationships from "./fetch/fetchRelationship";
import { fetchCreateProfilViewHistory } from "./fetch/fetchCreateProfilViewHistory";
import { checkErrorFetch } from "../Global/checkErrorFetch";
export default function Profile() {
  const paramId = useParams().id;
  const navigate = useNavigate();
  const { user, setTriggerReload } = useAuth();
  const [connected, setConnected] = useState(false);
  const [ourProfile, setOurProfil] = useState(false);

  const mutationCreateProfilView = useMutation(fetchCreateProfilViewHistory);
  const { data: allTagsData, isLoading: allTagsLoading } = useQuery(["tags"], fetchTags, {
    useErrorBoundary: false,
    onSuccess: (data) => {
      const isError = checkErrorFetch(data);

      if (isError.authorized == false) {
        setTriggerReload(true);
      }
    },
  });
  const { data: userInformationData, isLoading: userLoading } = useQuery(["id", paramId], fetchUser, {
    staleTime: 10000,
    cacheTime: 1000,
    onSuccess: (data) => {
      const isError = checkErrorFetch(data);
      if (isError.authorized == false) {
        setTriggerReload(true);
      }
      console.log(data);
      if (data.status == "success") {
        setConnected(data.result.connected);
      }
    },
  });
  const { data: relationShipData, isLoading: relationShipLoading } = useQuery(["relation", paramId], fetchRelationships, {
    staleTime: 1000,
    cacheTime: 10000,
    onSuccess: (data) => {
      console.log(data);
      const isError = checkErrorFetch(data);

      if (isError.authorized == false) {
        setTriggerReload(true);
      }
    },
  });

  const allTags = allTagsLoading ? [] : allTagsData.result;
  const relationship = relationShipLoading ? {} : relationShipData.result;
  const userInformation = userLoading ? {} : userInformationData.result;
  useEffect(() => {
    if (!paramId) {
      navigate("/match");
      return notify("warning", "you cant access user profile like this");
    }
  }, []);

  useEffect(() => {
    if (user.id != paramId) {
      socket.on("alert-disconnect", (msg) => {
        console.log("cc alter disconnect");
        if (msg.userId == paramId) {
          setConnected(false);
        }
      });
      socket.on("alert-connect", (msg) => {
        if (msg.userId == paramId) {
          console.log("cc alter connect");
          setConnected(true);
        }
      });
    }
    socket.emit("user_profile", { userId: paramId, currentUserId: user.id, ourProfile: user.id == paramId });

    return () => {
      setConnected(false);
      setOurProfil(false);
      socket.off("user_profile", () => {});
      socket.off("alert-disconnect", () => {});
      socket.off("alert-connect", () => {});
    };
  }, [paramId]);

  useEffect(() => {
    if (paramId === user.id) {
      setOurProfil(true);
    } else {
      mutationCreateProfilView.mutate({ paramId });
    }
  }, [paramId, user.id]);

  return (
    <>
      {(allTagsLoading || userLoading || relationShipLoading) && <GlobalLoading />}
      {!allTagsLoading && !userLoading && !relationShipLoading && (
        <UserProfile allTags={allTags} userInformation={userInformation} ourProfile={ourProfile} relationship={relationship} connected={connected} />
      )}
    </>
  );
}
