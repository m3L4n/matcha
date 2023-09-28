import "./Slider.scoped.css"
import PropTypes from "prop-types";
import { useState } from "react";

const Slider = ({ min, max, defaultValue, name }) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="slidercontainer">
      <input
        type="range"
        id={name}
        name={name}
        min={min}
        max={max}
        value={value}
        className="slider"
        onChange={e => setValue(e.target.value)}
      /> <label className="body">{value}</label>
    </div>
  );
}

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultValue: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default Slider;
