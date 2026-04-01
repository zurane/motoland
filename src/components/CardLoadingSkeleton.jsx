import "react-loading-skeleton/dist/skeleton.css";

const CardLoadingSkeleton = () => {
  return (
    <div className="result-card skeleton-card">
      {/* IMAGE */}
      <div className="image-wrapper">
        <div className="skeleton skeleton-image" />

        <span className="result-estimated-time skeleton-badge" />
      </div>

      {/* FOOTER */}
      <div className="card-footer">
        <div className="skeleton skeleton-title" />

        <div className="result-meta">
          <div className="skeleton skeleton-text short" />
          <div className="skeleton skeleton-text tiny" />
        </div>
      </div>
    </div>
  );
};

export default CardLoadingSkeleton;
