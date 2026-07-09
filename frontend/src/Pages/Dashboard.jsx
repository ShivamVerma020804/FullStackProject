import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import MainLayout from "../layouts/MainLayout";
import DashboardCard from "../components/DashboardCard";
import {
  getAllVideos,
  deleteVideo,
} from "../services/videoService";

function Dashboard() {
  const { user } = useAuth();

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await getAllVideos();

      setVideos(response.data.docs || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("accessToken");

      await deleteVideo(videoId, token);

      setVideos((prevVideos) =>
        prevVideos.filter(
          (video) => video._id !== videoId
        )
      );

      alert("Video deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete video.");
    }
  };

  const totalViews = videos.reduce(
    (sum, video) => sum + video.views,
    0
  );

  return (
    <MainLayout>
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, {user?.fullName || user?.username} 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Here's an overview of your channel.
        </p>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <DashboardCard
            title="Videos"
            value={videos.length}
          />

          <DashboardCard
            title="Subscribers"
            value="0"
          />

          <DashboardCard
            title="Views"
            value={totalViews}
          />

          <DashboardCard
            title="Playlists"
            value="0"
          />
        </div>

        {/* Uploads */}

        <div className="bg-white rounded-xl shadow p-6 mt-8">
          <h2 className="text-2xl font-semibold mb-6">
            Recent Uploads
          </h2>

          {loading ? (
            <p>Loading...</p>
          ) : videos.length === 0 ? (
            <p className="text-gray-500">
              No videos uploaded yet 🚀
            </p>
          ) : (
            <div className="space-y-5">
              {videos.map((video) => (
                <div
                  key={video._id}
                  className="flex items-center justify-between gap-5 border rounded-xl p-4 hover:shadow-md transition"
                >
                  <div className="flex items-center gap-5 flex-1">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-44 h-24 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {video.title}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        👁 {video.views} views
                      </p>

                      <p
                        className={`mt-1 font-medium ${
                          video.isPublished
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {video.isPublished
                          ? "🟢 Published"
                          : "🔒 Private"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleDelete(video._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;