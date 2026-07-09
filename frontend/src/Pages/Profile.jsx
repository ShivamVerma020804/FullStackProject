import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { useState, useRef } from "react";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import {
  updateAvatar,
  updateCoverImage,
} from "../services/userService";
import { useEffect } from "react";
import { getAllVideos } from "../services/videoService";
import VideoCard from "../components/VideoCard";

function Profile() {
  const { user, setUser } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [videos, setVideos] = useState([]);
const [totalViews, setTotalViews] = useState(0);

  const avatarRef = useRef(null);
  const coverRef = useRef(null);

  const handleAvatarChange = async (e) => {
    try {
      setUploadingAvatar(true);

      const file = e.target.files[0];

      if (!file) return;

      const token = localStorage.getItem("accessToken");

      const updatedUser = await updateAvatar(file, token);

      setUser(updatedUser);
    } catch (err) {
      console.log(err);
      alert("Unable to update avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleCoverChange = async (e) => {
    try {
      setUploadingCover(true);

      const file = e.target.files[0];

      if (!file) return;

      const token = localStorage.getItem("accessToken");

      const updatedUser = await updateCoverImage(file, token);

      setUser(updatedUser);
    } catch (err) {
      console.log(err);
      alert("Unable to update cover image");
    } finally {
      setUploadingCover(false);
    }
  };

  const fetchVideos = async () => {
  try {
    const response = await getAllVideos();

    const uploadedVideos = response.data.docs || [];

    setVideos(uploadedVideos);

    const views = uploadedVideos.reduce(
      (sum, video) => sum + video.views,
      0
    );

    setTotalViews(views);

  } catch (err) {
    console.log(err);
  }
};
useEffect(() => {
  fetchVideos();
}, []);

  return (
    <MainLayout>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Cover Image */}

        <div className="relative h-64 bg-gray-200">

          {user?.coverImage ? (
            <img
              src={user.coverImage}
              alt="Cover"
              onClick={() => coverRef.current.click()}
              className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition"
            />
          ) : (
            <div
              onClick={() => coverRef.current.click()}
              className="w-full h-full bg-gradient-to-r from-red-500 to-orange-500 cursor-pointer"
            />
          )}

          <input
            type="file"
            hidden
            accept="image/*"
            ref={coverRef}
            onChange={handleCoverChange}
          />

          {uploadingCover && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold text-xl">
              Uploading...
            </div>
          )}

        </div>

        {/* Profile */}

        <div className="px-10 pb-10">

          <div className="-mt-20">

            <div className="relative w-40">

              <img
                src={user?.avatar}
                alt="Avatar"
                onClick={() => avatarRef.current.click()}
                className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg cursor-pointer hover:opacity-80 transition"
              />

              <input
                type="file"
                hidden
                accept="image/*"
                ref={avatarRef}
                onChange={handleAvatarChange}
              />

              {uploadingAvatar && (
                <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center text-white font-semibold">
                  Uploading...
                </div>
              )}

            </div>

          </div>

          {/* User Info */}

          <div className="mt-8">

            <h1 className="text-4xl font-bold">
              {user?.fullName}
            </h1>

            <p className="text-gray-500 mt-2">
              @{user?.username}
            </p>

          <p className="text-gray-500">
  {user?.email}
</p>

<p className="text-gray-400 mt-1">
  Welcome to your NovaTube Channel 🎥
</p>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            <div className="bg-white border rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
              <h2 className="text-3xl font-bold">
  {videos.length}
</h2>

<p className="text-gray-500">
  Videos
</p>
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
              <h2 className="text-3xl font-bold">0</h2>
              <p className="text-gray-500">Subscribers</p>
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
              <h2 className="text-3xl font-bold">
  {totalViews}
</h2>

<p className="text-gray-500">
  Views
</p>
            </div>

            <div className="bg-white border rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
              <h2 className="text-3xl font-bold">0</h2>
              <p className="text-gray-500">Playlists</p>
            </div>

          </div>

          {/* Buttons */}

          <div className="flex gap-4 mt-10">

            <button
              onClick={() => setShowModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
            >
              Edit Profile
            </button>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              Change Password
            </button>

          </div>

        </div>

      </div>

      {/* My Videos */}

<div className="mt-14">

  <h2 className="text-3xl font-bold mb-8">
    My Videos
  </h2>

  {videos.length === 0 ? (

    <div className="bg-gray-100 rounded-xl p-10 text-center">

      <p className="text-gray-500 text-lg">
        You haven't uploaded any videos yet 🚀
      </p>

    </div>

  ) : (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      {videos.map((video) => (

       <VideoCard
    key={video._id}
    video={video}
    compact
/>

      ))}

    </div>

  )}

</div>

      {showModal && (
        <EditProfileModal
          user={user}
          setUser={setUser}
          onClose={() => setShowModal(false)}
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
        />
      )}

    </MainLayout>
  );
}

export default Profile;