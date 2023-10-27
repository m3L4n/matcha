import React from "react";
import "./InputProfile.scoped.css";
import { isValidEmail } from "src/components/Global/check-email";
import PropTypes, { element } from "prop-types";
export default function InputProfile({ name, value, label, type, handleInput, ourProfile }) {
  const triggerControlInput = (event, needAdd) => {
    const name = event.target.name;
    const divControlled = document.querySelector(`#controlled_input_${name}`);
    if (divControlled) {
      if (needAdd) {
        divControlled.classList.add("input-focused");
      } else {
        divControlled.classList.remove("input-focused");
      }
    }
  };
  const handleEmail = (event) => {
    const divControlled = document.querySelector(`#controlled_input_email`);
    if (divControlled) {
      if (isValidEmail(event.target.value)) {
        divControlled.classList.remove("input-wrong");
        divControlled.classList.add("input-focused");
      } else {
        divControlled.classList.add("input-wrong");
      }
    }
  };
  const handleAge = (event) => {
    const number = Number(event.target.value);
    const divControlled = document.querySelector(`#controlled_input_age`);
    if (divControlled) {
      if (Number.isNaN(number) || number < 18 || number > 99) {
        divControlled.classList.add("input-wrong");
      } else {
        divControlled.classList.remove("input-wrong");
        divControlled.classList.add("input-focused");
        event.target.value = Number(number);
      }
    }
  };
  const handleNumberOrEmail = (event) => {
    if (event.target.name == "email") {
      handleEmail(event);
    } else if (event.target.name == "age") {
      handleAge(event);
    }
    handleInput(event);
  };

  return (
    <div className="container-input">
      <label htmlFor={name} className="form-label">
        <p className="userInfo-form_label body-highlight">{label}</p>
        <input
          type={type}
          className="userInfo-form_input body"
          id={name}
          name={name}
          value={value}
          onInput={handleNumberOrEmail}
          disabled={ourProfile ? false : true}
          onFocus={(event) => triggerControlInput(event, true)}
          onBlur={(event) => triggerControlInput(event, false)}
        />
        <div className="controlled__input" id={`controlled_input_${name}`} />
      </label>
    </div>
  );
}
InputProfile.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  type: PropTypes.string,
  handleInput: PropTypes.func,
  ourProfile: PropTypes.bool,
};
