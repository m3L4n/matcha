import React from "react";
import "./ViewHistory.scoped.css";
import { useQuery } from "@tanstack/react-query";
import { fetchViewHistory } from "./fetch/fetchViewHistory";
import { useNavigate } from "react-router-dom";
import GlobalLoading from "../Global/GLoading/GlobalLoading";
import { checkErrorFetch } from "../Global/checkErrorFetch";
import { useAuth } from "src/Context/AuthContext";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin

export default function ViewHistory() {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.extend(localizedFormat);
  dayjs.tz.guess();
  // const d2 = dayjs(userInformation.latest_connection).format("llll");
  const { setTriggerReload } = useAuth();
  const { data: historyData, isLoading: historyLoading } = useQuery(["history"], fetchViewHistory, {
    onSuccess: (data) => {
      const isError = checkErrorFetch(data);
      if (isError.authorized == false) {
        setTriggerReload(true);
      }
    },
  });
  const historyUser = historyLoading ? [] : historyData.result ? historyData.result : [];
  const navigate = useNavigate();
  return (
    <>
      {historyLoading ? (
        <GlobalLoading />
      ) : (
        <div className="container-history">
          <header className="container-history__header">
            <h1 className="header header-text"> MATCHISTORY</h1>
            <p className="title-1"> our history of profil consulted</p>
          </header>
          <div className="container-render-history">
            {historyUser.length == 0 ? (
              <h3 className="body">go watch profil, this is empty here </h3>
            ) : (
              historyUser.map((elem, index) => {
                return (
                  <button key={index} className="container-view" onClick={() => navigate(`/profile/${elem.id_watched}`)}>
                    <img alt="profil_picture" src={elem.profile_picture} />
                    <span>
                      <p className="body-highlight">{elem.username}</p>
                      <p> {dayjs(elem.created_at).format("llll")}</p>
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
}
