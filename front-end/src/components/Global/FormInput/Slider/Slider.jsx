import "./Slider.scoped.css"
import { useState } from "react";

const Slider=({min, max, defaultValue}) => {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="slidercontainer">
      <input 
        type="range"
        name="slider"
        min={min}
        max={max}
        value={value}
        className="slider"
        onChange={e => setValue(e.target.value)}
      /> <label className="body" htmlFor="slider">{value}</label>
    </div>
  );
}

export default Slider;
