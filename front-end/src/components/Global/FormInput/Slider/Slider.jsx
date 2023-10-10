import "./Slider.scoped.css";
import PropTypes from "prop-types";
import { useState } from "react";

const Slider = ({ min, max, defaultValue, name, mesureUnit = "" }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="slidercontainer">
      <div className="slider-form">
        <label className="body" htmlFor={name}>
          min: {`${value} ${mesureUnit}`}
        </label>
        <input
          type="range"
          id={name}
          name={name}
          min={min}
          max={max}
          value={value}
          className="slider"
          onChange={e => setValue(e.target.value)}
        />{" "}
      </div>
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultValue: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  mesureUnit: PropTypes.string
};

export default Slider;
