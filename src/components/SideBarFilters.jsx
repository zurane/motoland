import { IoIosClose } from "react-icons/io";

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
          <div>
            <h4>Model Year</h4>
          </div>
          <div>
            <h4>Model Type</h4>
          </div>
          <div>
            <h4>Engine Capacity</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarFilters;
