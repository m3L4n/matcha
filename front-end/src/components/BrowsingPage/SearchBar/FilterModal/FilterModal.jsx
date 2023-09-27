import "./FilterModal.scoped.css";
import SelectOptionWrapper from "./SelectOptionWrapper/SelectOptionWrapper";
import Slider from "../../../Global/FormInput/Slider/Slider";
import Input from "../../../Global/FormInput/Input/Input";

const FILTER_OPTIONS = ["Age gap", "Location", "Fame rating", "Common tags"];

const FilterModal = () => {
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
          {FILTER_OPTIONS.map((option) => {
            return (
              <SelectOptionWrapper key={option} option={option}>
                {option === "Age gap" && <Slider min={0} max={60} defaultValue={10} />}
                {option === "Fame rating" && <Slider min={0} max={5200} defaultValue={1500} />}
                {option === "Location" && <Slider min={5} max={600} defaultValue={30} />}
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

export default FilterModal
