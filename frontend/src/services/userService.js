import api from "../api/axios";

export const registerUser = async (formData) => {
  const response = await api.post(
    "/users/register",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateProfile = async (data, token) => {
  const response = await api.patch(
    "/users/update-account",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

export const updateAvatar = async (avatar, token) => {
  const data = new FormData();

  data.append("avatar", avatar);

  const response = await api.patch(
    "/users/avatar",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};

export const updateCoverImage = async (coverImage, token) => {
  const data = new FormData();

  data.append("coverImage", coverImage);

  const response = await api.patch(
    "/users/cover-image",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.data;
};
export const changePassword = async (data, token) => {
  const response = await api.post(
    "/users/change-password",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};