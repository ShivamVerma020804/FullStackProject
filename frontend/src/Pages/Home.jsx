import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import VideoCard from "../components/VideoCard";
import { getFeedVideos } from "../services/videoService";

function Home() {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const response = await getFeedVideos();

            setVideos(response.data || []);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div>

                <h1 className="text-3xl font-bold mb-8">
                    Home
                </h1>

                {loading ? (

                    <div className="text-center py-20">
                        Loading videos...
                    </div>

                ) : videos.length === 0 ? (

                    <div className="text-center py-20 text-gray-500">
                        No videos found.
                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                        {videos.map((video) => (

                            <VideoCard
                                key={video._id}
                                video={video}
                            />

                        ))}

                    </div>

                )}

            </div>
        </MainLayout>
    );
}

export default Home;