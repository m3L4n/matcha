import React from "react";
import TextAreaProfile from "src/components/Global/TextAreaProfile/TextAreaProfile";
import "./UserDescription.scoped.css";
export default function UserDescription({ userInformation, handleChange, ourProfile }) {
  return (
    <div className="container-user-description">
      <h3 className="title-1"> Description </h3>
      <TextAreaProfile description={userInformation.description} handleChange={handleChange} ourProfile={ourProfile} />
    </div>
  );
}
