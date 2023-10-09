import "./FilterModal.scoped.css";
import SelectOptionWrapper from "./SelectOptionWrapper/SelectOptionWrapper";
import Slider from "../../../Global/FormInput/Slider/Slider";
import Input from "../../../Global/FormInput/Input/Input";
import Select from "src/components/Global/FormInput/Select/Select";
import PropTypes from "prop-types";

const FILTER_OPTIONS = ["Age gap", "Location", "Fame rating", "Tags"];

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
            ageGapMin: formData.get("ageGap-min") ?? "",
            ageGapMax: formData.get("ageGap-max") ?? "",
            locationMin: formData.get("location-min") ?? "",
            locationMax: formData.get("location-max") ?? "",
            fameMin: formData.get("fame-min") ?? "",
            fameMax: formData.get("fameMax") ?? "",
            sortBy: sortBy,
            sortOption: "ascending"
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
                    defaultMinValue={0}
                    defaultMaxValue={10}
                    name="ageGap"
                  />
                )}
                {option === "Fame rating" && (
                  <Slider
                    min={0}
                    max={5200}
                    defaultMinValue={0}
                    defaultMaxValue={5200}
                    name="fame"
                  />
                )}
                {option === "Location" && (
                  <Slider
                    min={5}
                    max={600}
                    defaultMinValue={30}
                    defaultMaxValue={300}
                    name="location"
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
          />
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
