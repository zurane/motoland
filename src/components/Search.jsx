import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiChevronDown,FiChevronRight } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { algoliasearch } from "algoliasearch";



const client = algoliasearch(
  import.meta.env.VITE_ALGOLIA_APP_ID,
  import.meta.env.VITE_ALGOLIA_SEARCH_KEY
);

export default function VehicleSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hints, setHints] = useState([]);
  const [showHints, setShowHints] = useState(false);

  // selectedIssue now tracks whatever the user types freely
  const [selectedIssue, setSelectedIssue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [openBrand, setOpenBrand] = useState("Nissan");
  const navigate = useNavigate();
  const [selectedModels, setSelectedModels] = useState({});

  const wrapperRef = useRef(null);

  // Handle clicking outside the custom vehicle dropdown
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

  // Fetch manufacturers and models on component mount
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/manufacturers/all");
        // console.log(response.data); // Optional: keep for debugging
        setVehicleData(response.data);
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const models = selectedModels[openBrand] || [];
    const rawModel = models[0] || "";

    const safeBrand = openBrand ? openBrand.trim() : "";
    const safeModel = rawModel.trim();
    const safeQuery = selectedIssue.trim();

    const debounceTimer = setTimeout(async () => {


      // If no car is selected or they haven't typed much, clear hints
      if (!safeBrand || !safeModel || safeQuery.length < 2) {
        setHints([]);
        setShowHints(false);
        return;
      }

      try {
        const filters = `make:'${safeBrand}' AND model:'${safeModel}'`;

        const response = await client.searchSingleIndex({
          indexName: 'motokare_tutorials',
          searchParams: {
            query: safeQuery,
            filters: filters,
            hitsPerPage: 5
          }
        });


        const cleanHits = response.hits.map((hit) => ({
          objectID: hit.objectID,
          title: String(hit.title),
          description: String(hit.description || ""),
        }));

        setHints(cleanHits);
        setShowHints(true);

      } catch (error) {
        console.error("4. ERROR -> Algolia request failed:", error.message);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);

  }, [selectedIssue, openBrand, selectedModels]);

  const handleHintClick = (hintTitle) => {
    // Fill the input with the clicked hint and hide the dropdown
    setSelectedIssue(hintTitle);
    setShowHints(false);
  };

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

      // We still require a car selection to proceed
      if (!openBrand || !selectedModel) {
        setIsSubmitting(false); // Reset loader if validation fails
        return;
      }

      // Navigate to the results page with the user's typed issue in the URL
      setTimeout(
        () =>
          navigate(
            `/results?manufacturer=${encodeURIComponent(
              openBrand
            )}&model=${encodeURIComponent(
              selectedModel
            )}&issue=${encodeURIComponent(selectedIssue || "")}`
          ),
        1000 // Reduced from 2000ms for a slightly snappier UX
      );
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vehicle-search-page">
      <div className="vehicle-search-hero">
        <div className="vehicle-search-content">
          <div className="vehicle-search-bar">

            {/* 1. Vehicle Selection Area (Unchanged) */}
            <div className="vehicle-search-input-wrap" ref={wrapperRef}>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={() => setDropdownOpen(true)}
                placeholder="Choose your vehicle make and model"
                className="vehicle-search-input"
              />
              <span className="vehicle-search-icon">
                <FiChevronDown />
              </span>
              {dropdownOpen && (
                <div className="vehicle-dropdown-card">
                  <div className="vehicle-dropdown-scroll">
                    {vehicleData.data &&
                      vehicleData.data.map((item) => {
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
                                Choose a Model
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
                                          <span className="vehicle-checkmark">✓</span>
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

            {/* 2. Free-text Input with INLINE STYLED Hints Dropdown */}
            <div className="vehicle-issue-wrap" style={{ position: "relative" }}>
              <input
                type="text"
                value={selectedIssue}
                onChange={(e) => setSelectedIssue(e.target.value)}
                onFocus={() => {
                  if (hints.length > 0) setShowHints(true);
                }}
                placeholder="What needs fixing? (e.g., replace air filter)..."
                className="vehicle-issue-input"
                style={{ width: "100%" }}
              />

              {/* 5. The floating hints dropdown with BULLETPROOF INLINE CSS */}
              {showHints && hints.length > 0 && (
                <ul
                  className="algolia-hints-dropdown"
                >
                  {hints.map((hint) => (
                    <li
                      key={hint.objectID}
                      onClick={() => handleHintClick(hint.title)}
                      className="algolia-hint-item"
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#ffffff"}
                    >
                      <strong style={{ display: "block", color: "#003c5c", fontSize: "15px", marginBottom: "4px" }}>
                        {hint.title}
                      </strong>
                      <p style={{ margin: "0", color: "#6b7280", fontSize: "13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {hint.description}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 3. Submit Button */}
            <button
              type="button"
              onClick={submitHandler}
              className="vehicle-search-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? <ClipLoader size={20} color="#ffffff" /> : "Find Tutorials"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}