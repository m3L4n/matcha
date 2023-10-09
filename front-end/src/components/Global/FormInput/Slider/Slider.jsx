import "./Slider.scoped.css";
import PropTypes from "prop-types";
import { useState } from "react";

const Slider = ({ min, max, defaultMinValue, defaultMaxValue, name }) => {
  const [minValue, setMinValue] = useState(defaultMinValue);
  const [maxValue, setMaxValue] = useState(defaultMaxValue);
  return (
    <div className="slidercontainer">
      <div className="slider-form">
        <label className="body" htmlFor={`${name}-min`}>
          min: {minValue}
        </label>
        <input
          type="range"
          id={`${name}-min`}
          name={`${name}-min`}
          min={min}
          max={max}
          value={minValue}
          className="slider"
          onChange={e => setMinValue(e.target.value)}
        />{" "}
      </div>
      <div className="slider-form">
        <label className="body" htmlFor={`${name}-max`}>
          max: {maxValue}
        </label>
        <input
          type="range"
          id={`${name}-max`}
          name={`${name}-max`}
          min={min}
          max={max}
          value={maxValue}
          className="slider"
          onChange={e => setMaxValue(e.target.value)}
        />{" "}
      </div>
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultMinValue: PropTypes.number.isRequired,
  defaultMaxValue: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired
};

export default Slider;
