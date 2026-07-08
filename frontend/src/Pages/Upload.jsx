import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { uploadVideo } from "../services/videoService";

function Upload() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleThumbnail = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setThumbnail(file);

    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleVideo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setVideoFile(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!videoFile || !thumbnail) {
        return setError(
          "Please select both video and thumbnail."
        );
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);

      const token = localStorage.getItem("accessToken");

      await uploadVideo(formData, token);

      alert("Video Uploaded Successfully 🚀");

      navigate("/");

    } catch (err) {

      console.log(err);

      setError(
        err.response?.data?.message ||
          "Unable to upload video."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-2">
          Upload Video
        </h1>

        <p className="text-gray-500 mb-8">
          Share your content with the world 🌎
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleUpload}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border rounded-xl p-4"
          />

          <textarea
            rows="5"
            placeholder="Video Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border rounded-xl p-4"
          />

          <div>

            <label className="font-semibold">
              Select Thumbnail
            </label>

            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={handleThumbnail}
            />

            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Preview"
                className="mt-4 h-48 rounded-xl border"
              />
            )}

          </div>

          <div>

            <label className="font-semibold">
              Select Video
            </label>

            <input
              type="file"
              accept="video/*"
              className="mt-2"
              onChange={handleVideo}
            />

            {videoFile && (
              <p className="mt-3 text-green-600">
                ✅ {videoFile.name}
              </p>
            )}

          </div>

          <button
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl p-4 text-lg font-semibold transition"
          >
            {loading
              ? "Uploading..."
              : "Upload Video"}
          </button>

        </form>

      </div>

    </MainLayout>
  );
}

export default Upload;