import React from "react";
import { IoMaleFemaleSharp, IoFemale, IoMaleSharp } from "react-icons/io5";
import { MdQuestionMark } from "react-icons/md";
import { FaFemale, FaMale } from "react-icons/fa";
import { BsCupStraw } from "react-icons/bs";
import { BiCoffeeTogo } from "react-icons/bi";
import InputProfile from "src/components/Global/InputProfile/InputProfile";
import MultipleButtonProfile from "src/components/Global/MultipleButtonProfile/MultipleButtonProfile";
import "./UserForm.scoped.css";
export default function UserForm({ ourProfile, userInformation, handleChange }) {
  console.log(userInformation);
  return (
    <div className="container-form">
      <span className="form-information-row">
        <InputProfile name="firstname" label={"firstname "} type="text" value={userInformation.firstname} handleInput={handleChange} ourProfile={ourProfile} />
        <InputProfile name="lastname" label={ourProfile ? "Your lastname" : "lastname"} type="text" value={userInformation.lastname} handleInput={handleChange} ourProfile={ourProfile} />
      </span>
      <span className="form-information-row">
        <InputProfile name="email" label={ourProfile ? "Your email" : "email"} type="text" value={userInformation.email} handleInput={handleChange} ourProfile={ourProfile} />
        <InputProfile name="age" label={ourProfile ? "Your age" : "age"} type="number" value={userInformation.age ? userInformation.age : 0} handleInput={handleChange} ourProfile={ourProfile} />
      </span>
      <span className="form-information-row">
        <MultipleButtonProfile
          name={"sexual_preference"}
          label={ourProfile ? "Your preference" : "preference"}
          value={userInformation.sexual_preference}
          ourProfile={ourProfile}
          handleChoose={handleChange}
          arrayObjectValue={[
            { value: "female", Icon: <IoFemale /> },
            { value: "male", Icon: <IoMaleSharp /> },
            { value: "both", Icon: <IoMaleFemaleSharp /> },
          ]}
        />
        <MultipleButtonProfile
          name={"gender"}
          label={ourProfile ? "Your gender" : "gender"}
          value={userInformation.gender}
          ourProfile={ourProfile}
          handleChoose={handleChange}
          arrayObjectValue={[
            { value: "female", Icon: <FaFemale /> },
            { value: "male", Icon: <FaMale /> },
            { value: "other", Icon: <MdQuestionMark /> },
          ]}
        />
        <MultipleButtonProfile
          name={"beverage"}
          label={ourProfile ? "Your Favorite beverage" : "Favorite beverage"}
          value={userInformation.beverage}
          ourProfile={ourProfile}
          handleChoose={handleChange}
          arrayObjectValue={[
            {
              value: "matcha",
              Icon: (
                <div>
                  matcha
                  <BsCupStraw />
                </div>
              ),
            },
            {
              value: "coffee",
              Icon: (
                <div>
                  coffee
                  <BiCoffeeTogo />
                </div>
              ),
            },
          ]}
        />
      </span>
    </div>
  );
}
