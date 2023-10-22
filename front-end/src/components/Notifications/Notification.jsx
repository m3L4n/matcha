import React, { useState } from "react";
import "./Notification.scoped.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNotifUser } from "./fetch/fetchNotifUser";
import GlobalLoading from "../Global/GLoading/GlobalLoading";
import { useNavigate } from "react-router-dom";

export default function Notification() {
  const types = ["messages", "view", "like", "all"];
  const navigate = useNavigate();
  const [viewType, setViewType] = useState(types[3]);
  const { data: notificationsData, isLoading: notificationsLoading } = useQuery(["notifications"], fetchNotifUser);

  const allNotifications = notificationsLoading ? [] : notificationsData.result.data;

  const getArrayAllNotif = () => {
    return allNotifications;
  };
  const getArrayFiltered = (typeFilter) => {
    return allNotifications.filter(({ type }) => type == typeFilter);
  };

  const RenderNotifFilter = () => {
    let notificationToShow = [];
    if (viewType == types[3]) {
      notificationToShow = getArrayAllNotif();
    } else {
      notificationToShow = getArrayFiltered(viewType);
    }
    return (
      <div className="container-render-notif">
        {notificationToShow.map((elem, index) => {
          console.log(elem);
          return (
            <div key={index} className="container-notif" onClick={() => navigate(`/profile/${elem.id_user_requester}`)}>
              <img src={elem.profile_picture} />
              <span className="body-highlight">
                {elem.username} {elem.action}
              </span>
            </div>
          );
        })}
        {notificationToShow.length == 0 && <h3> 0 notificatons of {viewType}</h3>}
      </div>
    );
  };
  return (
    <>
      {notificationsLoading ? (
        <GlobalLoading />
      ) : (
        <div className="container-notification">
          <header className="container-notification__header">
            <h1 className="header header-text">MATCHIFY</h1>
            <h3 className="title-1 "> Our notification</h3>
          </header>
          <div className="container-notification__body">
            <div className="notificatio__body-button">
              {types.map((type, index) => (
                <button key={index} value={type} className="button-notif" onClick={() => setViewType(type)}>
                  {type}
                </button>
              ))}
            </div>

            <RenderNotifFilter />
          </div>
        </div>
      )}
    </>
  );
}
