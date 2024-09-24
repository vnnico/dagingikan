const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllFish = async (params) => {
  const page = params.queryKey[1];
  const search = params.queryKey[2];

  const response = await fetch(
    `${API_URL}/api/fish?page=${page}&search=${search}`
  );

  const responseBody = await response.json();
  console.log(responseBody);
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return responseBody;
};

export const getFish = async (params) => {
  const fishId = params.queryKey[1];
  const response = await fetch(`${API_URL}/api/fish/${fishId}`);

  const responseBody = await response.json();
  if (!response.ok) throw new Error("Failed to fetch");
  return responseBody;
};

/**
 *
 * ADMIN ACTIONS
 */

export const addFish = async (data) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("weight", data.weight);
  formData.append("image", data.image[0]);

  const response = await fetch(`${API_URL}/api/fish`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error("Failed to add");
  return responseBody;
};

export const editFish = async (data) => {
  const fishId = data.id;
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("price", data.price);
  formData.append("weight", data.weight);
  if (data.image.length > 0) formData.append("image", data.image[0]);

  const response = await fetch(`${API_URL}/api/fish/${fishId}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error("Failed to fetch");
  return responseBody;
};

export const deleteFish = async (fishId) => {
  const response = await fetch(`${API_URL}/api/fish/${fishId}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error("Failed to fetch");
  return responseBody;
};
