import { IoIosClose } from "react-icons/io";
import { PiCaretDownLight, PiCaretUpLight } from "react-icons/pi";



const SideBarFilters = (props) => {
  return (
    <div className="sidebar-filters-overlay">
      <div className="sidebar-filters">
        <div className="search-filer-head">
          <h3>Filter results</h3>
          <button onClick={props.closeFilters} className="close-filters-btn">
            <IoIosClose size={30} />
          </button>
        </div>
        <div className="model-filters-section-body">
          <div className="filter-category-wrapper">
            <h4>Model Year</h4>
            <button><PiCaretDownLight /></button>
          </div>
          <div className="filter-category-wrapper">
            <h4>Body Type</h4>
            <button><PiCaretDownLight /></button>
          </div>
          <div className="filter-category-wrapper">
            <h4>Min Engine Capacity</h4>
            <button><PiCaretDownLight /></button>
          </div>
        </div>
        <div className="sidebar-filters-footer">
          <button className="clear-filters-btn">Clear Filters</button>
          <button className="apply-filters-btn">Apply Filters</button>
        </div>
      </div>
    </div>
  );
};

export default SideBarFilters;
