import React from "react";
import "./TextAreaProfile.scoped.css";
export default function TextAreaProfile({ description, ourProfile, handleChange }) {
  return (
    <textarea
      name="description"
      value={description}
      className="Lcontainer-userDescription-text body"
      placeholder="tell us about you ? :)"
      disabled={ourProfile ? false : true}
      onChange={handleChange}
    />
  );
}
