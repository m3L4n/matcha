import React from "react";
import "./FormButton.scoped.css";

export default function FormButton({ label, handleChange }) {
  return (
    <>
      <button onClick={handleChange} className="button-form title-1">
        {" "}
        {label}{" "}
      </button>
    </>
  );
}
