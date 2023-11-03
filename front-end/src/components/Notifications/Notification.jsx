import React, { useEffect, useState } from "react";
import "./Notification.scoped.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNotifUser } from "./fetch/fetchNotifUser";
import GlobalLoading from "../Global/GLoading/GlobalLoading";
import { useNavigate } from "react-router-dom";
import { socket } from "src/socket/socket";
import { useAuth } from "src/Context/AuthContext";
import { checkErrorFetch } from "../Global/checkErrorFetch";

export default function Notification() {
  const types = ["messages", "view", "like", "all"];
  const navigate = useNavigate();
  const { user, setTriggerReload } = useAuth();
  const [viewType, setViewType] = useState(types[3]);
  const { data: notificationsData, isLoading: notificationsLoading, refetch: refetchNotif } = useQuery(["notifications"], fetchNotifUser, {
    onSuccess: (data) => {
      const isError = checkErrorFetch(data);
      if (isError.authorized == false) {
        setTriggerReload(true);
      }
    },
  });

  const allNotifications = notificationsLoading ? [] : notificationsData.result?.data ? notificationsData.result?.data : [];
  const getArrayAllNotif = () => {
    return allNotifications ? allNotifications : [];
  };
  const getArrayFiltered = (typeFilter) => {
    if (allNotifications.length > 0) {
      return allNotifications.filter(({ type }) => type == typeFilter);
    }
    return [];
  };

  useEffect(() => {
    socket.emit("user-view-notif", { userId: user.id });
    socket.on("alert-new-notif", (msg) => {
      if (msg.userReciver == user.id) {
        refetchNotif();
      }
    });
    return () => {
      socket.off("alert-new-notif");
    };
  }, []);

  const RenderNotifFilter = () => {
    let notificationToShow = [];
    if (viewType == types[3]) {
      notificationToShow = getArrayAllNotif();
    } else {
      notificationToShow = getArrayFiltered(viewType);
      console.log(notificationToShow);
    }
    return (
      <div className="container-render-notif">
        {notificationToShow.map((elem, index) => {
          return (
            <button key={index} className="container-notif" onClick={() => navigate(`/profile/${elem.id_user_requester}`)}>
              <img alt="profile_picture" src={elem.profile_picture} />
              <span className="body-highlight">
                {elem.username} {elem.action}
              </span>
            </button>
          );
        })}
        {notificationToShow.length == 0 && <h3 className="body"> 0 notificatons of {viewType}</h3>}
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
            <div className="notification__body-button">
              {types.map((type, index) => (
                <button key={index} value={type} className={(viewType == type ? " button-notif  active" : " button-notif ") + " body-highlight"} onClick={() => setViewType(type)}>
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
