import "./Select.scoped.css";

const Select = ({ options }) => {
  return (
    <div className="selectcontainer">
      <select className="option" name="" id="">
        { options.map(option => {
          return (
            <option key={option} value={option}>{option}</option>
          );
        })} 
      </select>
    </div>
  );
}

export default Select;
