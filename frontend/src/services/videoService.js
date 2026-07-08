import api from "../api/axios";

/*
=====================================
Upload Video
=====================================
*/

export const uploadVideo = async (formData, token) => {
  const response = await api.post(
    "/videos/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/*
=====================================
Get All Videos
=====================================
*/

export const getAllVideos = async () => {
  const response = await api.get("/videos");

  return response.data;
};

/*
=====================================
Get Single Video
=====================================
*/

export const getVideoById = async (videoId) => {
  const response = await api.get(`/videos/${videoId}`);

  return response.data;
};

/*
=====================================
Update Video
=====================================
*/

export const updateVideo = async (
  videoId,
  formData,
  token
) => {
  const response = await api.patch(
    `/videos/${videoId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/*
=====================================
Delete Video
=====================================
*/

export const deleteVideo = async (
  videoId,
  token
) => {
  const response = await api.delete(
    `/videos/${videoId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/*
=====================================
Toggle Publish
=====================================
*/

export const togglePublish = async (
  videoId,
  token
) => {
  const response = await api.patch(
    `/videos/toggle/publish/${videoId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};