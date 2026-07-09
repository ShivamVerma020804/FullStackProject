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

            <div className="max-w-screen-2xl mx-auto">

                {/* Heading */}

                <div className="mb-10">

                    <h1 className="text-4xl font-bold">
                        Discover Videos
                    </h1>

                    <p className="text-gray-500 mt-2 text-lg">
                        Explore the latest uploads from creators around NovaTube.
                    </p>

                </div>

                {/* Loading */}

                {loading ? (

                    <div className="flex flex-col items-center justify-center py-24">

                        <div className="animate-pulse text-6xl">
                            🎥
                        </div>

                        <p className="mt-6 text-xl text-gray-500">
                            Loading videos...
                        </p>

                    </div>

                ) : videos.length === 0 ? (

                    /* Empty State */

                    <div className="flex flex-col items-center justify-center py-24">

                        <div className="text-7xl">
                            🎬
                        </div>

                        <h2 className="text-3xl font-bold mt-6">
                            No Videos Yet
                        </h2>

                        <p className="text-gray-500 mt-3 text-center max-w-md">
                            Looks like nobody has uploaded anything yet.
                            Be the first creator to share your content on NovaTube.
                        </p>

                    </div>

                ) : (

                    /* Video Grid */

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

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