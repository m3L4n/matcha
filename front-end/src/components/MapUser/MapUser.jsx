import React, { useEffect } from "react";
import "./MapUser.scoped.css";
// import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import { useAuth } from "src/Context/AuthContext";
import { notify } from "../Global/toast-notify";
export default function MapUser() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.users) {
      notify("error", "you have to be connected to see this page");
      navigate("/match");
    }
  }, []);
  const { user } = useAuth();
  return (
    <MapContainer center={[user.position.x, user.position.y]} zoom={13} scrollWheelZoom={false}>
      <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
