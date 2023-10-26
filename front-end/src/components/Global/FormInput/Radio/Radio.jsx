import PropTypes from "prop-types";
import "./Radio.scoped.css";

const Radio = ({ name }) => {
  return (
    <>
      <h3 className="body">Sort by:</h3>
      <label className="form-control" htmlFor={name + "Ascending"}>
        <input
          type="radio"
          name={name}
          id={name + "Ascending"}
          value="ascending"
        />
        ascending
      </label>
      <label className="form-control" htmlFor={name + "Descending"}>
        <input
          type="radio"
          name={name}
          id={name + "Descending"}
          value="descending"
        />
        descending
      </label>
    </>
  );
};

Radio.propTypes = {
  name: PropTypes.string.isRequired
};

export default Radio;
