import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import NavBar from "../components/NavBar.jsx";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";


export default function VehicleSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openBrand, setOpenBrand] = useState("Nissan");
  const navigate = useNavigate();
  const [selectedModels, setSelectedModels] = useState({

  });

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch manufacturers and models on component mount to populate the dropdown
  useEffect(() => {
    try {
      const getData = async () => {
        const response = await axios.get("http://localhost:3000/manufacturers/all");
        console.log(response.data);
        setVehicleData(response.data);
      }
      getData();
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  }, [])

  useEffect(() => {
    try {
      const getCategories = async () => {
        const response = await axios.get("http://localhost:3000/categories/all");
        setCategories(response.data);
      }
      getCategories();
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  const toggleBrand = (brand) => {
    setOpenBrand((prev) => (prev === brand ? null : brand));
  };

  const toggleModel = (brand, model) => {
    setSelectedModels({
      [brand]: [model],
    });

    setSearchTerm(`${brand} ${model}`);
  };

  const submitHandler = async () => {
    setIsSubmitting(true);
    try {
      const models = selectedModels[openBrand] || [];
      const selectedModel = models[0] || "";

      if (!openBrand || !selectedModel) return;

      setTimeout(
        () =>
          navigate(
            `/results?manufacturer=${encodeURIComponent(openBrand)}&model=${encodeURIComponent(selectedModel)}&issue=${encodeURIComponent(selectedIssue || "")}`,
          ),
        2000,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="vehicle-search-page">
      <div className="vehicle-search-hero">
        <div className="vehicle-search-content">
          <div className="vehicle-search-bar">
            <div className="vehicle-search-input-wrap" ref={wrapperRef}>
              <span className="vehicle-search-icon">
                <FiSearch />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={() => setDropdownOpen(true)}
                placeholder="Select manufacturer and vehicle model"
                className="vehicle-search-input"
              />

              {dropdownOpen && (
                <div className="vehicle-dropdown-card">
                  <div className="vehicle-dropdown-scroll">
                    {vehicleData.data && vehicleData.data.map((item) => {
                      const isOpen = openBrand === item.name;
                      const chosen = selectedModels[item.name] || [];

                      return (
                        <div key={item.id} className="vehicle-brand-block">
                          <div className="vehicle-brand-header">
                            <h3 className="vehicle-brand-title">{item.name}</h3>

                            <button
                              type="button"
                              className="vehicle-models-button"
                              onClick={() => toggleBrand(item.name)}
                            >
                              Models
                              <span
                                className={`vehicle-chevron ${isOpen ? "open" : ""}`}
                              >
                                <FiChevronDown />
                              </span>
                            </button>
                          </div>

                          {isOpen && (
                            <div className="vehicle-models-panel">
                              {item.models.map((model) => {
                                const checked = chosen.includes(model.name);
                                return (
                                  <label
                                    key={model.id}
                                    className="vehicle-model-row"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={checked}
                                      onChange={() =>
                                        toggleModel(item.name, model.name)
                                      }
                                      className="vehicle-hidden-checkbox"
                                    />
                                    <span
                                      className={
                                        checked
                                          ? "vehicle-checkbox vehicle-checkbox-checked"
                                          : "vehicle-checkbox"
                                      }
                                    >
                                      {checked && (
                                        <span className="vehicle-checkmark">
                                          ✓
                                        </span>
                                      )}
                                    </span>
                                    <span className="vehicle-model-label">
                                      {model.name}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="vehicle-issue-wrap">
              <select
                value={selectedIssue}
                onChange={(e) => setSelectedIssue(e.target.value)}
                className="vehicle-issue-select"
              >
                <option value="">Select your issue</option>
                {categories && categories.map((issue) => (
                  <option className="options-dropdown" key={issue.id} value={issue.name}>
                    {issue.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={submitHandler}
              className="vehicle-search-button"
            >
              {isSubmitting ? <ClipLoader size={20} color="#fff" /> : "Search"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
