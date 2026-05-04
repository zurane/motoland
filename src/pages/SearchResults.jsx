import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton.jsx";
import { PiFadersHorizontal } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "axios";
import TutorialCard from "../components/TutorialCard.jsx";
import SideBarFilters from "../components/SideBarFilters.jsx";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleFilters, setToggleFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [getArraySize, setGetArraySize] = useState(0);
  const [error, setError] = useState("");

  const manufacturer = searchParams.get("manufacturer");
  const model = searchParams.get("model");
  const issue = searchParams.get("issue");

  const closeFilers = () => {
    setToggleFilters(false);
  };

  const toggleFiltersHandler = () => {
    setToggleFilters((prev) => !prev);
  };

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get("http://localhost:3000/search", {
          params: {
            manufacturer,
            model,
            issue,
          },
        });
        setIsLoading(true);
        setResults(response.data.data || []);
        setGetArraySize(response.data.data.length || 0);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (err) {
        console.error(err);
        setError(
          "Something went wrong while loading results. Try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [manufacturer, model, issue]);

  return (
    <div className="results-page">
      {toggleFilters && <SideBarFilters closeFilters={closeFilers} />}
      <div className="results-container">
        <div className="results-header px-3">
          <h1>
            Results for {manufacturer} {model} in {issue}
          </h1>
          <p>
            <Link to="/" className="home-link">
              Home
            </Link>
            {manufacturer ? ` › ${manufacturer}` : ""}
            {model ? ` › ${model}` : ""}
            {issue ? ` › ${issue}` : ""}
          </p>
        </div>

        {loading && <p className="results-message">Loading results...</p>}

        {error && <p className="results-error">{error}</p>}

        {!loading && !error && results.length === 0 && (
          <p className="results-message">No tutorials found.</p>
        )}

        <div className="flex flex-row align-center justify-between py-4 px-3">
          <span className="search-results-count">({getArraySize}) results</span>
          <button
            onClick={toggleFiltersHandler}
            className="filter-results-btn align-center flex gap-2 "
          >
            <PiFadersHorizontal size={24} />
            <span>Filters</span>
          </button>
        </div>

        {!loading && !error && results.length > 0 && (
          <article>
            {isLoading ? (
              <article className="results-grid">
                {[...Array(getArraySize)].map((_, i) => (
                  <CardLoadingSkeleton key={i} />
                ))}
              </article>
            ) : (
              <article className="results-grid">
                {results.map((item) => (
                  <TutorialCard key={item.id} item={item} />
                ))}
              </article>
            )}
          </article>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
