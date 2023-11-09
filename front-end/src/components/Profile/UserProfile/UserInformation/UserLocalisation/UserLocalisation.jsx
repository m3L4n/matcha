import React from "react";
import "./UserLocalisation.scoped.css";
import InputProfile from "src/components/Global/InputProfile/InputProfile";
export default function UserLocalisation({ locationInput, buttonUpdate,getLocation, updateLocationInput, ourProfile }) {
  return (
    <div className="container-user-location">
      <h3 className="body-highlight"> Localisation</h3>
      <div className="user-location-body">
        <button onClick={getLocation} className="body button-update-location">
          {" "}
          synchronize your location
        </button>
        <div className="container-input">
          <span className="input-row">
            <InputProfile name="latitude" type="number" label="latitude" value={locationInput.latitude} ourProfile={ourProfile} handleInput={updateLocationInput} />
            <InputProfile name="longitude" type="number" label="longitude" value={locationInput.longitude} ourProfile={ourProfile} handleInput={updateLocationInput} />
          </span>
          <button onClick={buttonUpdate} className="body button-submit-gps">
            {" "}
            update
          </button>
        </div>
      </div>
    </div>
  );
}
