import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CardLoadingSkeleton from "../components/CardLoadingSkeleton.jsx";
import axios from "axios";
import TutorialCard from "../components/TutorialCard.jsx";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const manufacturer = searchParams.get("manufacturer");
  const model = searchParams.get("model");
  const issue = searchParams.get("issue");

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
        setTimeout ( () =>{
          setIsLoading(false);
        }, 2000);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading results. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [manufacturer, model, issue]);

  return (
    <div className="results-page">
      <div className="results-container">
        <div className="results-header">
          <h1>
            Search results for {manufacturer} {model} in {issue}
          </h1>
          <p>
            <strong>{manufacturer}</strong>
            {model ? ` › ${model}` : ""}
            {issue ? ` › ${issue}` : ""}
          </p>
        </div>

        {loading && <p className="results-message">Loading results...</p>}

        {error && <p className="results-error">{error}</p>}

        {!loading && !error && results.length === 0 && (
          <p className="results-message">No tutorials found.</p>
        )}

        {!loading && !error && results.length > 0 && (
          <article>
            {isLoading ? (
              <article className="results-grid">
                {[...Array(3)].map((_, i) => (
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
