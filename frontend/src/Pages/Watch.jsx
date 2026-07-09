import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import { getVideoById } from "../services/videoService";

function Watch() {
    const { videoId } = useParams();

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVideo();
    }, [videoId]);

    const fetchVideo = async () => {
        try {
            const response = await getVideoById(videoId);
            setVideo(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <MainLayout>
                <div className="text-center mt-20 text-xl">
                    Loading...
                </div>
            </MainLayout>
        );
    }

    if (!video) {
        return (
            <MainLayout>
                <div className="text-center mt-20 text-xl">
                    Video not found.
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="max-w-6xl mx-auto">

                {/* Video Player */}

                <div className="bg-black rounded-xl overflow-hidden flex justify-center items-center">

                    <video
                        controls
                        className="w-full max-h-[75vh] object-contain"
                        src={video.videoFile}
                    />

                </div>

                {/* Title */}

                <h1 className="text-3xl font-bold mt-6">
                    {video.title}
                </h1>

                {/* Owner */}

                <div className="flex justify-between items-center mt-6 flex-wrap gap-4">

                    <div className="flex items-center gap-4">

                        <img
                            src={video.owner.avatar}
                            alt={video.owner.username}
                            className="w-14 h-14 rounded-full object-cover"
                        />

                        <div>

                            <h2 className="font-semibold text-lg">
                                {video.owner.fullName}
                            </h2>

                            <p className="text-gray-500">
                                @{video.owner.username}
                            </p>

                        </div>

                    </div>

                    {/* Temporary Subscribe Button */}

                    <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition">
                        Subscribe
                    </button>

                </div>

                {/* Stats */}

                <div className="flex items-center gap-6 mt-6 text-gray-600">

                    <span>
                        👁 {video.views} views
                    </span>

                    <span>
                        📅{" "}
                        {new Date(
                            video.createdAt
                        ).toLocaleDateString()}
                    </span>

                </div>

                {/* Description */}

                <div className="bg-gray-100 rounded-xl p-5 mt-6">

                    <h3 className="font-semibold mb-2">
                        Description
                    </h3>

                    <p className="text-gray-700 whitespace-pre-wrap">
                        {video.description}
                    </p>

                </div>

            </div>
        </MainLayout>
    );
}

export default Watch;