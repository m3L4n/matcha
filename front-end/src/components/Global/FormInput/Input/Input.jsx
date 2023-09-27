import "./Input.scoped.css";
import PropTypes from "prop-types";

const Input = ({ name, placeholder }) => {
  return (
    <div className="inputcontainer">
      <input type="text" name={name} placeholder={placeholder} />
    </div>
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Input;
