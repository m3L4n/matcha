import "./FilterModal.scoped.css";

const FilterModal = () => {
  return (
    <div className="filter-menu">
      <form action="">
        <div className="select-effect">
          <div className="filter-matches-wrapper">
            <input type="radio" name="filter-menu-effect" id="filter-matches" checked/>
            <label htmlFor="filter-matches">filter</label>
          </div>
          <div className="sort-matchs-wrapper">
            <input type="radio" name="filter-menu-effect" id="sort-matches" />
            <label htmlFor="sort-matches">sort</label>
          </div>
        </div>
        <div className="filter-options">
          <div className="filter-age">
            <input type="range" min="18" max="100" value="18" className="slider" id="minAge" />
            <input type="range" min="18" max="100" value="18" className="slider" id="maxAge" />
          </div>
          <div className="filter-fame">
            <input type="range" min="0" max="420" value="100" className="slider" id="minFame" />
            <input type="range" min="0" max="420" value="100" className="slider" id="maxFame" />
          </div>
          <div className="filter-tags">
            <input type="text" name="" id="tags" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default FilterModal
