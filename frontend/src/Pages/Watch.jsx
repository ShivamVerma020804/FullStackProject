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
        <div className="flex justify-center items-center py-32">
          <p className="text-slate-500 text-lg">
            Loading video...
          </p>
        </div>
      </MainLayout>
    );
  }

  if (!video) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center py-32">
          <p className="text-slate-500 text-lg">
            Video not found.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto">

        {/* Video */}

        <div className="rounded-2xl overflow-hidden shadow-lg bg-black">

          <video
            controls
            className="w-full max-h-[75vh]"
            src={video.videoFile}
          />

        </div>

        {/* Video Info */}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mt-8">

          <h1 className="text-3xl font-bold text-slate-800">
            {video.title}
          </h1>

          <div className="flex items-center justify-between mt-5 flex-wrap gap-4">

            <div className="flex items-center gap-4">

              <img
                src={video.owner.avatar}
                alt={video.owner.username}
                className="w-14 h-14 rounded-full object-cover border-2 border-violet-200"
              />

              <div>

                <h2 className="font-semibold text-lg">
                  {video.owner.fullName}
                </h2>

                <p className="text-slate-500">
                  @{video.owner.username}
                </p>

              </div>

            </div>

            <div className="bg-violet-100 text-violet-700 px-5 py-2 rounded-full font-semibold">

              👁 {video.views} Views

            </div>

          </div>

          <div className="mt-8">

            <h3 className="font-semibold text-slate-700 mb-3">
              Description
            </h3>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-slate-600 leading-7">

              {video.description}

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default Watch;