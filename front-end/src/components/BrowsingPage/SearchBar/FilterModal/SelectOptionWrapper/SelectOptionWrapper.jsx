import { useState } from "react";
import "./SelectOptionWrapper.scoped.css"
import { AiOutlineRight, AiOutlineDown } from "react-icons/ai";
import Radio from "src/components/Global/FormInput/Radio/Radio";

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
          <Radio name={`${option.toLowerCase().split(" ")[0]}Sort`} />
        </>
      }
    </div >
  );
}

export default SelectOptionWrapper;
