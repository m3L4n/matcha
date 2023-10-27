import React from "react";
import "./MultipleButtonProfile.scoped.css";
export default function MultipleButtonProfile({ name, arrayObjectValue, value, label, handleChoose, ourProfile }) {
  return (
    <div className="container-multiple-button">
      <p className="userInfo-form_label body-highlight">{label}</p>
      <div className="multiple-button">
        {arrayObjectValue.map((Elem, index) => {
          return (
            <button
              key={index}
              value={Elem.value}
              name={name}
              className={value == Elem.value ? "button-select active" : "button-select"}
              onClick={handleChoose}
              disabled={ourProfile ? false : true}
            >
              {Elem.Icon}
              {/* <Icon /> */}
            </button>
          );
        })}
      </div>
    </div>
  );
}
