import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "axios";


const Tutorial = () => {
    const [tutorialData, setTutorialData] = useState(null);
    const [error, setError] = useState("");
    const [searchParams] = useSearchParams();
    const location = useLocation();
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
                const tutorials = response.data?.data || [];
                const matchedTutorial = tutorials.find((item) => {
                    const matchesId = tutorialId && String(item.id) === String(tutorialId);
                    const matchesSlug = slug && item.slug === slug;
                    const matchesModel = !model || item.model?.name === model;

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
        <div className="tutorial">
            <p>Welcome to Motoland! This tutorial will guide you through the process of using our platform to find solutions for your motorcycle issues.</p>
            <div className="tutorial-content">
                {error ? (
                    <p>{error}</p>
                ) : tutorialData ? (
                    <div>
                        <h2>{tutorialData.title}</h2>
                        <p>{tutorialData.description}</p>
                        {/* You can add more details about the tutorial here */}
                    </div>
                ) : (
                    <p>Loading tutorial data...</p>
                )}
            </div>
        </div>
    )
}

export default Tutorial;
