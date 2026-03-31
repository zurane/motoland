import thumbNail from "../assets/DB2021AU00725_web_1600.jpg";

const TutorialCard = ({ item }) => {
  return (
    <div key={item.id} className="result-card">
      {/* IMAGE */}
      <a href={`/tutorials/${item.slug}`} className="result-link">
        <div className="image-wrapper">
          <img
            src={item.imageUrl || thumbNail}
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
              {item.model &&
                item.model.manufacturer &&
                item.model.manufacturer.name}{" "}
              {item.model && item.model.name}
            </span>

            <span>{item.difficulty}</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default TutorialCard;
