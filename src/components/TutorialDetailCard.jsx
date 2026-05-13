import "react-loading-skeleton/dist/skeleton.css";

const TutorialDetailCard = () => {
  return (
    <div
      className="tutorial-content-card tutorial-detail-skeleton max-w-2xl mx-auto bg-[#F8FAFC] shadow-md skeleton-card"
      aria-hidden="true"
    >
      <div className="video-wrapper bg-black">
        <div className="skeleton skeleton-detail-video" />
      </div>

      <div className="tutorial-details rounded-md bg-white line-height-1.7">
        <div className="card-header border-b border-gray-200 mb-3 flex flex-row items-center justify-between py-5 px-5">
          <div className="flex items-center gap-2">
            <span className="tutorial-detail-logo skeleton" />
            <div className="skeleton tutorial-detail-brand" />
          </div>

          <div className="flex items-center gap-3">
            <span className="tutorial-detail-action skeleton" />
            <span className="tutorial-detail-action skeleton" />
          </div>
        </div>

        <div className="mb-1 pb-5 px-5">
          <div className="skeleton skeleton-detail-title" />
          <div className="skeleton skeleton-detail-description" />
          <div className="skeleton skeleton-detail-description short" />

          <div className="card-chips my-4">
            <span className="results-meta-type rounded-full skeleton tutorial-detail-chip" />
            <span className="model-variant rounded-full skeleton tutorial-detail-chip variant" />
          </div>

          <div className="tutorial-detail-stats mt-6 grid grid-cols-3 justify-between gap-5 text-gray-600">
            <div className="tutorial-detail-stat bg-gray-100 px-4 py-2 rounded text-sm">
              <div className="skeleton tutorial-detail-stat-label" />
              <div className="skeleton tutorial-detail-stat-value" />
            </div>

            <div className="tutorial-detail-stat bg-gray-100 px-4 py-2 rounded text-sm">
              <div className="skeleton tutorial-detail-stat-label" />
              <div className="skeleton tutorial-detail-stat-value" />
            </div>

            <div className="tutorial-detail-stat bg-gray-100 px-4 py-2 rounded text-sm">
              <div className="skeleton tutorial-detail-stat-label" />
              <div className="skeleton tutorial-detail-stat-value" />
            </div>
          </div>
        </div>

        <div className="px-5 border-t border-gray-200 py-3">
          <div className="skeleton tutorial-detail-helpful-label" />
          <div className="flex items-center gap-3 mt-2">
            <span className="tutorial-detail-feedback skeleton" />
            <span className="tutorial-detail-feedback skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetailCard;
