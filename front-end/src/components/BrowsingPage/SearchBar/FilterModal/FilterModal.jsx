import "./FilterModal.scoped.css";
import SelectOptionWrapper from "./SelectOptionWrapper/SelectOptionWrapper";
import Slider from "../../../Global/FormInput/Slider/Slider";
import Input from "../../../Global/FormInput/Input/Input";
import PropTypes from "prop-types";

const FILTER_OPTIONS = ["Age gap", "Location", "Fame rating", "Common tags"];

const FilterModal = ({ setRequestParams }) => {

  return (
    <div className="filter-menu">
      <form className="form-control"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            action: "filter",
            age: formData.get("ageGap") ?? "",
            ageSort: formData.get("ageSort") ?? "",
            location: formData.get("location") ?? 30,
            locationSort: formData.get("locationSort") ?? "",
            fame: formData.get("fame") ?? 300,
            fameSort: formData.get("fameSort") ?? "",
            tags: formData.get("tags") ?? "",
            tagsSort: formData.get("tagsSort") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <div className="filter-options">
          {FILTER_OPTIONS.map((option) => {
            return (
              <SelectOptionWrapper key={option} option={option}>
                {option === "Age gap" && (<Slider min={0} max={60} defaultValue={10} name="ageGap" />)}
                {option === "Fame rating" && <Slider min={0} max={5200} defaultValue={1500} name="fame" />}
                {option === "Location" && <Slider min={5} max={600} defaultValue={30} name="location" />}
                {option === "Tags" && <Input name="tags" placeholder={"#tea, #coffee, #nature ..."} />}
              </SelectOptionWrapper>
            );
          })}
        </div>
        <input className="filter-submit" type="submit" value="Filter" />
      </form>
    </div >
  )
}

FilterModal.propTypes = {
  setRequestParams: PropTypes.func.isRequired,
};

export default FilterModal;
