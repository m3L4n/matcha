import "./FilterModal.scoped.css";
import SelectOptionWrapper from "./SelectOptionWrapper/SelectOptionWrapper";
import Slider from "../../../Global/FormInput/Slider/Slider";
import Input from "../../../Global/FormInput/Input/Input";
import { useState } from "react";
import PropTypes from "prop-types";

const FILTER_OPTIONS = ["Age gap", "Location", "Fame rating", "Common tags"];

const FilterModal = ({ setRequestParams }) => {
  const [action, setAction] = useState("");

  return (
    <div className="filter-menu">
      <form className="form-control"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            action: action ?? "",
            age: formData.get("ageGap") ?? "",
            location: formData.get("location") ?? 30,
            fame: formData.get("fame") ?? 300,
            tags: formData.get("tags") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <div className="select-effect body">
          <div className="filter-matches-wrapper">
            <input type="radio" name="filter-matches" id="filter-matches" onClick={() => setAction("filter")} />
            <label htmlFor="filter-matches">filter</label>
          </div>
          <div className="sort-matches-wrapper">
            <input type="radio" name="sort-matches" id="sort-matches" onClick={() => setAction("sort")} />
            <label htmlFor="sort-matches">sort</label>
          </div>
        </div>
        <div className="filter-options">
          {FILTER_OPTIONS.map((option) => {
            return (
              <SelectOptionWrapper key={option} option={option}>
                {option === "Age gap" && <Slider min={0} max={60} defaultValue={10} name="ageGap" />}
                {option === "Fame rating" && <Slider min={0} max={5200} defaultValue={1500} name="fame" />}
                {option === "Location" && <Slider min={5} max={600} defaultValue={30} name="location" />}
                {option === "Common tags" && <Input name="tags" placeholder={"#tea, #coffee, #nature ..."} />}
              </SelectOptionWrapper>
            );
          })}
        </div>
        <input className="filter-submit" type="submit" value="Apply" />
      </form>
    </div>
  )
}

FilterModal.propTypes = {
  setRequestParams: PropTypes.func.isRequired,
};

export default FilterModal;
