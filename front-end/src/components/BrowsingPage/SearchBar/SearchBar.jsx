import { BsFilter, BsSearch } from 'react-icons/bs'
import { CgClose } from 'react-icons/cg';
import { useState } from 'react';
import "./SearchBar.scoped.css";
import FilterModal from './FilterModal/FilterModal';

export default function SearchBar() {
  const [filter, setFilter] = useState(false);

  function toggleMenu() {
    setFilter(!filter);
  }
  return (
    <nav className="searchForm">
      <form action="">
        <input className='searchbar' placeholder='Search' />
        <button type="submit"><BsSearch size={16}/></button>
      </form>
      <div className='filter' onClick={toggleMenu}> { filter ? <CgClose /> : <BsFilter />} </div>  
      { filter && <FilterModal /> } 
    </nav>
  );
}
