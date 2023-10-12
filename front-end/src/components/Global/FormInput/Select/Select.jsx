import PropTypes from "prop-types";
import "./Select.scoped.css";

const Select = ({ options, name, label }) => {
  return (
    <>
      <label htmlFor={name} className="sort-select-label">{label}:</label>
      <select className="sort-select" name={name} id={name}>
        {options.map((item) => {
          return (
            <option className="sort-select-option" key={item} value={item}>{item}</option>
          );
        })
        }
      </select>
    </>
  )
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
}

export default Select;
