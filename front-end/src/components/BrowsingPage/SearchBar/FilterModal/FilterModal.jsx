import "./FilterModal.scoped.css";
import { AiOutlineRight } from "react-icons/ai";

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
            return (<div className="options" key={option}>
              <p>{option}</p><p> <AiOutlineRight /> </p>
            </div>);
          })} 
        </div>
        <input className="filter-submit" type="submit" value="Apply" />
      </form>
    </div>
  )
}

export default FilterModal
