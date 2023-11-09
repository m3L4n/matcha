import React, { useEffect, useState } from "react";
import "./Horoscope.scoped.css";
import allDataHoroscope from "./data-horoscope.json";
import { notify } from "../Global/toast-notify";
export default function Horoscope() {
  const [dataHorsocope, setDataHoroscope] = useState({});
  useEffect(() => {
    const date1 = new Date().setDate(0);
    console.log(date1, localStorage.getItem("created_horosocope"))
    if (localStorage.getItem("created_horosocope") < date1) {
      localStorage.removeItem("created_horosocope");
      return;
    }
    if (localStorage.getItem("created_horoscope") && localStorage.getItem("horoscopeData")) {
      console.log("herre ici ca passe", localStorage.getItem("horoscopeData"))
      setDataHoroscope(allDataHoroscope[localStorage.getItem("horoscopeData")]);
    }
  }, []);
  useEffect(() =>{
    console.log(dataHorsocope);
  },[dataHorsocope])

  const handleHoroscope = () => {
    const date1 = new Date().setDate(0);
    console.log(localStorage.getItem("created_horoscope"), new Date().setDate(1), new Date().getDate());
    if (localStorage.getItem("created_horoscope")){

      if (localStorage.getItem("created_horoscope") > date1) {
        notify("warning", "we cant tell you the futur one per day");
        return;
      }
      return
    }
    const randomInt = Math.floor(Math.random() * 20);
    const date = new Date().setDate(1);
    localStorage.setItem("created_horoscope", date);
    localStorage.setItem("horoscopeData", randomInt);
    setDataHoroscope(allDataHoroscope[randomInt]);
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
