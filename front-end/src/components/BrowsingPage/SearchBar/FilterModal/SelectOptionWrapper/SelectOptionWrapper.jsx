import { useState } from "react";
import "./SelectOptionWrapper.scoped.css"
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";

const SelectOptionWrapper = ({ option, children }) => {
  const [menu, setMenu] = useState(false);

  return (
    <div className="menu-button">
      <div className="options" onClick={() => (setMenu(!menu))}>
        <p>{option}</p><p> {menu ? <AiOutlineDown /> : <AiOutlineRight />} </p>
      </div>
      {menu &&
        <>
          {children}
        </>
      }
    </div >
  );
}

export default SelectOptionWrapper;
