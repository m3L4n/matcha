import "./FilterModal.scoped.css";
import SelectOptionWrapper from "./SelectOptionWrapper/SelectOptionWrapper";
import Slider from "../../../Global/FormInput/Slider/Slider";
import Input from "../../../Global/FormInput/Input/Input";
import Select from "../../../Global/FormInput/Select/Select";

const FilterModal = () => {
  const FILTER_OPTIONS = ["Age", "Location", "Fame rating", "Common tags"];
  return (
    <div className="filter-menu">
      <form className="form-control">
        <div className="select-effect body">
          <div className="filter-matches-wrapper">
            <input type="radio" name="filter-menu-effect" id="filter-matches" />
            <label htmlFor="filter-matches">filter</label>
          </div>
          <div className="sort-matches-wrapper">
            <input type="radio" name="filter-menu-effect" id="sort-matches" />
            <label htmlFor="sort-matches">sort</label>
          </div>
        </div>
        <div className="filter-options">
          { FILTER_OPTIONS.map((option) => {
            return (
              <SelectOptionWrapper key={option} option={option}>
                {option === "Age" && <Slider min={18} max={100} defaultValue={21} />}
                {option === "Fame rating" && <Slider min={0} max={420} defaultValue={100} />}
                {option === "Location" && <Select options={["Paris", "Montpellier", "Bondy"]} />}
                {option === "Common tags" && <Input placeholder={"#tea, #coffee, #nature ..."}/>}
              </SelectOptionWrapper>
            );
          })} 
        </div>
        <input className="filter-submit" type="submit" value="Apply" />
      </form>
    </div>
  )
}

export default FilterModal
