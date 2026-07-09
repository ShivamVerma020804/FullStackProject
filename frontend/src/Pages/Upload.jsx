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
            className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <textarea
            rows="5"
            placeholder="Video Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

<div>

  <label className="block font-semibold mb-3">
    Thumbnail
  </label>

  <label className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition">

    <div className="text-center">

      <div className="text-5xl mb-2">
        🖼️
      </div>

      <p className="font-semibold">
        Choose Thumbnail
      </p>

      <p className="text-sm text-gray-500 mt-1">
        JPG, PNG or WEBP
      </p>

    </div>

    <input
      hidden
      type="file"
      accept="image/*"
      onChange={handleThumbnail}
    />

  </label>

  {thumbnail && (

    <p className="mt-4 text-green-600 font-medium">
      ✅ {thumbnail.name}
    </p>

  )}

  {thumbnailPreview && (

    <img
      src={thumbnailPreview}
      alt="Preview"
      className="mt-5 w-full max-h-72 object-cover rounded-xl shadow"
    />

  )}

</div>
<div>

  <label className="block font-semibold mb-3">
    Video File
  </label>

  <label className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-red-500 hover:bg-red-50 transition">

    <div className="text-center">

      <div className="text-5xl mb-2">
        🎥
      </div>

      <p className="font-semibold">
        Choose Video
      </p>

      <p className="text-sm text-gray-500 mt-1">
        MP4, MOV, AVI
      </p>

    </div>

    <input
      hidden
      type="file"
      accept="video/*"
      onChange={handleVideo}
    />

  </label>

  {videoFile && (

    <p className="mt-4 text-green-600 font-medium break-all">
      ✅ {videoFile.name}
    </p>

  )}

</div>

          <button
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 hover:scale-[1.01] text-white rounded-2xl py-4 text-lg font-semibold transition-all duration-300 disabled:opacity-60"
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