import React from "react";
import "./BlockedView.scoped.css";
import { fetchBlockView } from "./fetchBlockView";
import { useQuery } from "@tanstack/react-query";
import GlobalLoading from "../Global/GLoading/GlobalLoading";
import { checkErrorFetch } from "../Global/checkErrorFetch";
import { useAuth } from "src/Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function BlockView() {
  const navigate = useNavigate();
  const { setTriggerReload } = useAuth();
  const { data: notificationsData, isLoading: notificationsLoading } = useQuery(["notifications"], fetchBlockView, {
    onSuccess: (data) => {
      const isError = checkErrorFetch(data);
      if (isError.authorized == false) {
        setTriggerReload(true);
      }
    },
  });
  const allBlock = notificationsLoading ? [] : notificationsData.result ? notificationsData.result : [];
  return (
    <div className="container-history">
      <header className="container-history__header">
        <h1 className="header-text header"> MATCHABLOCK </h1>
        <h3 className="body-highlight"> your history of block user </h3>
      </header>
      {notificationsLoading && <GlobalLoading />}
      {!notificationsLoading && (
        <div className="container-render-history">
          {allBlock?.map((elem, index) => {
            return (
              <button key={index} onClick={() => navigate(`/profile/${elem.id_receiver}`)} className="container-view">
                <img alt="profil-block" src={elem.profile_picture} />
                <h2> {elem.username}</h2>
              </button>
            );
          })}
          {allBlock.length == 0 && <p className="body-highlight"> Go block some profile</p>}
        </div>
      )}
    </div>
  );
}
