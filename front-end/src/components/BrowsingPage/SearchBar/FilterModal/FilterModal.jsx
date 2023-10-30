import "./FilterModal.scoped.css";
import SelectOptionWrapper from "./SelectOptionWrapper/SelectOptionWrapper";
import Slider from "../../../Global/FormInput/Slider/Slider";
import Input from "../../../Global/FormInput/Input/Input";
import Select from "src/components/Global/FormInput/Select/Select";
import PropTypes from "prop-types";

const FILTER_OPTIONS = ["Age gap", "Location gap", "Fame rating", "Tags"];

const FilterModal = ({ setFilterParams }) => {
  return (
    <div className="filter-menu">
      <form
        className="form-control"
        onSubmit={e => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const sortBy = formData.get("sort");
          const filterParams = {
            ageGap: formData.get("ageGap") ?? "",
            locationGap: formData.get("location") ?? "",
            fameGap: formData.get("fame") ?? "",
            sortBy: sortBy,
            sortOption: formData.get("sort-type") ?? "ascending"
          };
          setFilterParams(filterParams);
        }}
      >
        <div className="filter-options">
          {FILTER_OPTIONS.map(option => {
            return (
              <SelectOptionWrapper key={option} option={option}>
                {option === "Age gap" && (
                  <Slider
                    min={0}
                    max={60}
                    defaultValue={10}
                    name="ageGap"
                    mesureUnit="years"
                  />
                )}
                {option === "Fame rating" && (
                  <Slider
                    min={0}
                    max={1000}
                    defaultValue={300}
                    name="fame"
                    mesureUnit="fame rate"
                  />
                )}
                {option === "Location gap" && (
                  <Slider
                    min={5}
                    max={600}
                    defaultValue={200}
                    name="location"
                    mesureUnit="km"
                  />
                )}
                {option === "Tags" && (
                  <Input
                    name="tags"
                    placeholder={"#tea, #coffee, #nature ..."}
                  />
                )}
              </SelectOptionWrapper>
            );
          })}
          <Select
            options={[
              "select sort option",
              ...FILTER_OPTIONS.map(option =>
                option.split(" ")[0].toLowerCase()
              )
            ]}
            name="sort"
            label="Sort by"
            className="sort-select"
          />
          <div className="sort-options">
            <div className="radio-ascending">
              <input
                type="radio"
                name="sort-type"
                id="ascending"
                value="ascending"
                defaultChecked
              />
              <label htmlFor="ascending">ascending</label>
            </div>

            <div className="radio-descending">
              <input
                type="radio"
                name="sort-type"
                id="descending"
                value="descending"
              />
              <label htmlFor="descending">descending</label>
            </div>
          </div>
        </div>
        <input className="filter-submit" type="submit" value="Filter" />
      </form>
    </div>
  );
};

FilterModal.propTypes = {
  setFilterParams: PropTypes.func.isRequired
};

export default FilterModal;
