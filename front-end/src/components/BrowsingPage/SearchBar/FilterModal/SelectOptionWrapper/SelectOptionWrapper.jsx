import { useState } from "react";
import "./SelectOptionWrapper.scoped.css";
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";

const SelectOptionWrapper = ({ option, children }) => {
  const [menu, setMenu] = useState(false);

  return (
    <div className="menu-button">
      <button
        className="options"
        onClick={e => {
          e.preventDefault();
          setMenu(!menu);
        }}
      >
        <p>{option}</p>
        <p> {menu ? <AiOutlineDown /> : <AiOutlineRight />} </p>
      </button>
      {menu && <>{children}</>}
    </div>
  );
};

export default SelectOptionWrapper;
