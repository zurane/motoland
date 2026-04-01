import React, { useRef, useState, useEffect } from "react";
import { FiSearch, FiChevronDown, FiChevronRight } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const vehicleData = [
  {
    brand: "Toyota",
    models: [
      "Corolla",
      "RAV4",
      "Land Cruiser",
      "Highlander",
      "Starlet",
      "Yaris GR",
      "Hilux",
    ],
  },
  {
    brand: "Nissan",
    models: ["Navara", "X-Trail", "Qashqai"],
  },
  {
    brand: "Hyundai",
    models: ["i20", "Tucson", "Creta"],
  },
  {
    brand: "Honda",
    models: ["Civic", "CR-V", "Jazz"],
  },
  {
    brand: "Volkswagen",
    models: ["Polo", "Golf", "Tiguan", "Polo Vivo"],
  },
  {
    brand: "BMW",
    models: ["320i", "X3", "X5"],
  },
  {
    brand: "Audi",
    models: ["A3", "A4", "Q5"],
  },
  {
    brand: "Volvo",
    models: ["S90", "XC90", "XC60", "V90"],
  },
  {
    brand: "Ford",
    models: ["Ranger", "Everest", "Fiesta"],
  },
  {
    brand: "Haval",
    models: ["H6", "Jolion", "H9"],
  },
];

const issues = [
  "Engine",
  "Brake pads",
  "Oil change",
  "Battery",
  "Overheating",
  "Suspension",
  "Spark plugs",
];

export default function VehicleSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openBrand, setOpenBrand] = useState("Toyota");
  const navigate = useNavigate();
  const [selectedModels, setSelectedModels] = useState({
    Toyota: ["Corolla"],
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
        {/* <h1 className="vehicle-search-heading">Fix the small things</h1> */}
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
                  {vehicleData.map((item) => {
                    const isOpen = openBrand === item.brand;
                    const chosen = selectedModels[item.brand] || [];

                    return (
                      <div key={item.brand} className="vehicle-brand-block">
                        <div className="vehicle-brand-header">
                          <h3 className="vehicle-brand-title">{item.brand}</h3>

                          <button
                            type="button"
                            className="vehicle-models-button"
                            onClick={() => toggleBrand(item.brand)}
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
                              const checked = chosen.includes(model);

                              return (
                                <label
                                  key={model}
                                  className="vehicle-model-row"
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() =>
                                      toggleModel(item.brand, model)
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
                                    {model}
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
              {issues.map((issue) => (
                <option key={issue} value={issue}>
                  {issue}
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
  );
}
