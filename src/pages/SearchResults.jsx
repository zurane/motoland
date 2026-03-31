import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import thumbNail from "../assets/DB2021AU00725_web_1600.jpg";
import axios from "axios";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
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

        setResults(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading results.");
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
            Search results for {manufacturer} {model} in {issue} maintenance
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
          <article className="results-grid">
           {results.map((item) => (
  <div key={item.id} className="result-card">
    
    {/* IMAGE */}
    <a
                    href={`/tutorials/${item.slug}`}
                    className="result-link"
                  >
    <div className="image-wrapper">
      <img
        src={item.imageUrl || thumbNail} // fallback
        alt={item.title}
        style={{ width: "100%", display: "block" }}
      />

      {/* TIME BADGE */}
      {item.estimatedTimeMinutes && (
        <span className="result-estimated-time">
          {item.estimatedTimeMinutes} min
        </span>
      )}
    </div>

    {/* FOOTER */}
    <div className="card-footer">
      <h2 className="result-title">{item.title}</h2>

      <div className="result-meta">
        <span>
          {item.model?.manufacturer?.name} {item.model?.name}
        </span>

        <span>
          {item.difficulty}
        </span>
      </div>
    </div>
</a>
  </div>
))}
          </article>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
