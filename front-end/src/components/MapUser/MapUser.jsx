import React, { useEffect, useState } from "react";
import "./MapUser.scoped.css";
// import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useAuth } from "src/Context/AuthContext";
import { notify } from "../Global/toast-notify";
export default function MapUser() {
  const { state } = useLocation();
  const [matches, setMatch] = useState([]);
  const navigate = useNavigate();

  if (!state) {
    notify("error", "you have to be connected to see this page");
    navigate("/match");
    return;
  }
  useEffect(() => {
    if (state?.data?.length == 0 || !state) {
      notify("error", "you have to be connected to see this page");
      navigate("/match");
      return;
    } else {
      getPositionUsers(state?.data);
    }
  }, []);
  const { user } = useAuth();
  const getPositionUsers = async (allMatches) => {
    const result = allMatches?.map((elem) => {
      const obj = elem;
      obj.position = [elem.position.x, elem.position.y];
      return obj;
    });
    setMatch(result);
  };

  return (
    <div>
      <header className="container-header">
        <h1 className="header header-text"> MATCHAMAP</h1>
        <p className="title-1"> the map of possible match </p>
      </header>
      <MapContainer
        center={[user?.position?.x, user?.position?.y]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup chunkedLoading>
          {matches.map((elem, index) => {
            return (
              <Marker position={elem?.position} key={index}>
                <Popup>
                  <div className="info-popup">
                    <img src={elem?.profile_picture} alt="popup-avatar" />
                    <h1> {elem?.username}</h1>
                    <button
                      onClick={() => navigate(`/profile/${elem?.id}`)}
                      className="button-go-profile body"
                    >
                      go to profile
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MarkerClusterGroup>
        <Marker position={[user?.position?.x, user?.position?.y]}>
          <Popup className="info-popup">
            <div className="info-popup">
              <img src={user?.profile_picture} alt="popup-avatar" />
              <h1> {user?.username}</h1>
              <button
                onClick={() => navigate(`/profile/${user?.id}`)}
                className="button-go-profile body"
              >
                go to our profile
              </button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
