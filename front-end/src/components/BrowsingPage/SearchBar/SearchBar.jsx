import { BsFilter, BsSearch } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg';
import { useState } from 'react';
import "./SearchBar.scoped.css";
import FilterModal from './FilterModal/FilterModal';
import PropTypes from "prop-types";

export default function SearchBar({ requestParams, setRequestParams }) {
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
          age: criteria === "ageGap" ? searchCriteria : requestParams,
          location: criteria === "location" ? searchCriteria : requestParams,
          fame: criteria === "fameRating" ? searchCriteria : requestParams,
          tags: criteria === "tags" ? searchCriteria : requestParams,
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
      {filter && <FilterModal setRequestParams={setRequestParams} />}
    </nav>
  );
}

SearchBar.propTypes = {
  setRequestParams: PropTypes.func.isRequired,
};
