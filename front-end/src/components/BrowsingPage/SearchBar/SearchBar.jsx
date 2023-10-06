import { BsFilter, BsSearch } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg';
import { useState } from 'react';
import "./SearchBar.scoped.css";
import FilterModal from './FilterModal/FilterModal';
import PropTypes from "prop-types";

export default function SearchBar({ requestParams, setRequestParams, setFilterParams }) {
  const [filter, setFilter] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");

  function toggleMenu() {
    setFilter(!filter);
  }

  return (
    <nav className="searchForm">
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const criteria = formData.get("searchBy");
        const searchParams = {
          action: "search",
          age: criteria === "ageGap" ? searchCriteria : requestParams.age,
          location: criteria === "location" ? searchCriteria : requestParams.location,
          fame: criteria === "fameRating" ? searchCriteria : requestParams.fame,
          tags: criteria === "tags" ? searchCriteria : requestParams.tags,
        }
        setRequestParams(searchParams);
      }}>
        <div className="searchbar-container">
          <input name='searchbar' className='searchbar' placeholder='Search' value={searchCriteria} onChange={(e) => {
            setSearchCriteria(e.target.value);
          }} />
          <button type="submit"><BsSearch size={16} /></button>
        </div>
        <select className='searchSelect' name="searchBy" id="searchBy">
          <option value="">Search by:</option>
          <option value="ageGap">age gap</option>
          <option value="fameRating">fame rating</option>
          <option value="location">location</option>
          <option value="tags">tags</option>
        </select>
      </form>
      <div className='filter' onClick={toggleMenu}> {filter ? <CgClose /> : <BsFilter />} </div>
      {filter && <FilterModal setFilterParams={setFilterParams} />}
    </nav>
  );
}

SearchBar.propTypes = {
  setRequestParams: PropTypes.func.isRequired,
  setFilterParams: PropTypes.func.isRequired,
  requestParams: PropTypes.shape({
    action: PropTypes.string,
    age: PropTypes.string,
    location: PropTypes.string,
    game: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
