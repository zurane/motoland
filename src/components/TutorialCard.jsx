import thumbNail from "../assets/vw-polo.jpg";
import { Link, useLocation } from "react-router-dom";

const TutorialCard = ({ item }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams({
    tutorialId: String(item.id),
    model: item.model?.name || "",
    slug: item.slug || "",
  });
  const previousUrl = `${location.pathname}${location.search}${location.hash}`;

  return (
    <div key={item.id} className="result-card">
      {/* IMAGE */}
      <Link
        to={`/tutorials?${searchParams.toString()}`}
        state={{ tutorial: item, previousUrl }}
        className="result-link"
      >
        <div className="image-wrapper">
          <img
            src={item.imageUrl || thumbNail}
            alt={item.title}
            style={{ width: "100%", display: "block" }}
          />

          {/* TIME BADGE */}
          <span className="result-logo">
            <img src={item.model.manufacturer?.logoUrl} alt="brand logo" className=" rounded-full" />
          </span>
        </div>
        {/* CARD FOOTER */}
        <div className="card-footer">
          <h2 className="result-title">{item.title}</h2>
          <div className="result-meta">
            <div>
              {item.model &&
                item.model.manufacturer &&
                item.model.manufacturer.name}{" "}
              {item.model && item.model.name}
              <br />
              <div className="card-chips">
                <span className="results-meta-type">
                  {item.model.type && `  ${item.model.type}`} •{" "}
                  {item.model.modelEngineSize &&
                    `${item.model.modelEngineSize.toFixed(1)}L`}
                </span>
                <span className="model-variant">
                  {item.model.yearFrom && `${item.model.yearFrom}`}{" "}
                  {item.model.modelVariant && ` ${item.model.modelVariant}`}
                </span>
              </div>
            </div>
          </div>
          <span className="small">
            {" "}
            {item.difficulty} Level • {item.estimatedTimeMinutes} min
          </span>
        </div>
      </Link>
    </div>
  );
};

export default TutorialCard;
