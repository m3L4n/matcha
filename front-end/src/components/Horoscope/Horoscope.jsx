import React, { useState } from "react";
import "./Horoscope.scoped.css";
import allDataHoroscope from "./data-horoscope.json";
import { notify } from "../Global/toast-notify";
export default function Horoscope() {
  const [dataHorsocope, setDataHoroscope] = useState({});
  const [clicked, setClicked] = useState(false);

  const handleHoroscope = () => {
    if (!clicked) {
      const randomInt = Math.floor(Math.random() * 20);
      const date = new Date().setDate(1);
      localStorage.setItem("created_horoscope", date);
      localStorage.setItem("horoscopeData", randomInt);
      setDataHoroscope(allDataHoroscope[randomInt]);
      setClicked(true);
    } else {
      notify("warning", "you cant do this now, please retry later you might have more chance");
    }
  };
  return (
    <div className="container-horoscope">
      <header className="container-header">
        <h1 className="header"> MATCHOROSCOPE</h1>
        <h3 className="title-1">YOUR HOROSCOPE</h3>
      </header>
      {Object.keys(dataHorsocope).length > 0 && (
        <div className="container-horoscope-info">
          {" "}
          <h2 className="body-highlight">{dataHorsocope.title}</h2>
          <img alt="horoscope" src={dataHorsocope.image} className="img-horoscope" />
          <p className="body">{dataHorsocope.description}</p>
        </div>
      )}
      <div className="container-horoscope-body">
        <button className="button-future body-highlight" onClick={handleHoroscope}>
          Tell me the future
        </button>
      </div>
    </div>
  );
}
