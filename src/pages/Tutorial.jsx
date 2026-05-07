import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import logo from "../assets/vw-logo.png";
import { Link } from "react-router-dom";
import { PiArrowLeftLight, PiShareFatLight } from "react-icons/pi";
import { LuBookmark, LuShare } from "react-icons/lu";
import CustomVideoPlayer from "../components/VideoPlayer";
import axios from "axios";


const Tutorial = () => {
    const [tutorialData, setTutorialData] = useState(null);
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const previousUrl = location.state?.previousUrl || "/";
    const { tutorialId: pathTutorialId } = useParams();
    const tutorialId = searchParams.get("tutorialId") || pathTutorialId;
    const model = searchParams.get("model");
    const slug = searchParams.get("slug");

    useEffect(() => {
        const getTutorialData = async () => {
            try {
                setError("");

                if (location.state?.tutorial) {
                    setTutorialData(location.state.tutorial);
                    console.log("Using tutorial data from location state:", location.state.tutorial);
                    return;
                }

                if (!tutorialId) {
                    setTutorialData(null);
                    setError("Tutorial details are missing from the URL.");
                    return;
                }

                const response = await axios.get("http://localhost:3000/search");
                console.log(response.data);
                const tutorials = response.data?.data || [];
                const matchedTutorial = tutorials.find((tutorialData) => {
                    const matchesId = tutorialId && String(tutorialData.id) === String(tutorialId);
                    const matchesSlug = slug && tutorialData.slug === slug;
                    const matchesModel = !model || tutorialData.model?.name === model;

                    return (matchesId || matchesSlug) && matchesModel;
                });

                if (!matchedTutorial) {
                    setTutorialData(null);
                    setError("We couldn't find that tutorial.");
                    return;
                }
                console.table("Matched tutorial found:", matchedTutorial);
                setTutorialData(matchedTutorial);
            } catch (error) {
                console.error("Error fetching tutorial data:", error);
                setError("Something went wrong while loading this tutorial.");
            }
        };

        getTutorialData();
    }, [location.state, tutorialId, model, slug]);
    return (
        <div className="tutorial-page-header">
            <div className="max-w-6xl mx-auto py-8">
                <span className="bg-[#49D4C6] p-2 rounded-full mb-5 inline-block">
                    <Link to={previousUrl} className="text-black">
                        <PiArrowLeftLight size={24} />
                    </Link>
                </span>
            </div>
            {
                tutorialData ? (
                    <div className="tutorial-content-card max-w-6xl mx-auto bg-white shadow-md">
                        <div className="video-wrapper bg-black">
                            <CustomVideoPlayer />
                        </div>
                        <div className="tutorial-details rounded-md bg-white line-height-1.7">
                            <div className="card-header border-b border-gray-200 mb-3 flex flex-row items-center justify-between py-5 px-5 ">
                                <div>
                                    <img src={tutorialData?.logoUrl || logo} alt="manufacturer Logo" className="w-12 h-12 object-contain" />
                                </div>
                                <div>
                                    <button className="bg-gray-100 p-3 rounded-full mr-3">
                                        <LuShare size={20} />
                                    </button>
                                    <button className="bg-gray-100 p-3 rounded-full">
                                        <LuBookmark size={20} />
                                    </button>
                                </div>

                            </div>
                            <div className="mb-3 border-b border-gray-200 pb-5 px-5">

                                <h2 className="text-2xl font-semibold my-2">{tutorialData?.title || "Tutorial Title"}</h2>
                                <p >{tutorialData.model.manufacturer?.name} {tutorialData?.model?.name}</p>
                                <div className="card-chips my-2">
                                    <span className="results-meta-type">
                                        {tutorialData.model.type && `  ${tutorialData.model.type}`} •{" "}
                                        {tutorialData.model.modelEngineSize &&
                                            `${tutorialData.model.modelEngineSize.toFixed(1)}L`}
                                    </span>
                                    <span className="model-variant">
                                        {tutorialData.model.yearFrom && `${tutorialData.model.yearFrom}`}{" "}
                                        {tutorialData.model.modelVariant && ` ${tutorialData.model.modelVariant}`}
                                    </span>
                                </div>
                                <span className="small my-6">
                                    {" "}
                                    {tutorialData.difficulty} Level • {tutorialData.estimatedTimeMinutes} min
                                </span>
                            </div>
                            <div className="pt-1 pb-5 px-5 border-b border-gray-200 mb-5">
                                <h3 className="font-semibold">Description</h3>
                                <p className="text-gray-600 description">{tutorialData?.description || "Tutorial description goes here. This is a placeholder description for the tutorial."}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="error-message bg-red-100 text-red-700 p-4 rounded">
                        {error || "Loading tutorial..."}
                    </div>
                )
            }
        </div>

    )
}

export default Tutorial;
