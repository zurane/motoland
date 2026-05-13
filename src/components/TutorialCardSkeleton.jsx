import "react-loading-skeleton/dist/skeleton.css";

const TutorialCardSkeleton = () => {
  return (
    <div className="result-card skeleton-card">
      <div className="image-wrapper">
        <div className="skeleton skeleton-image" />
        <span
          className="result-logo skeleton"
          style={{ borderRadius: "999px" }}
          aria-hidden="true"
        />
      </div>

      <div className="card-footer">
        <div className="skeleton skeleton-title" />

        <div className="result-meta">
          <div style={{ width: "100%" }}>
            <div className="skeleton skeleton-text tiny" />
            <div className="flex items-center gap-2.5">
              <div className="skeleton skeleton-text short" /><div className="skeleton skeleton-text short" />
            </div>
            
          </div>
        </div>

        <div className="skeleton skeleton-text short" />
      </div>
    </div>
  );
};

export default TutorialCardSkeleton;
