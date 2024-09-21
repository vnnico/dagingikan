const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllFish = async () => {
  const response = await fetch(`${API_URL}/api/fish`);

  const responseBody = await response.json();
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

export const addFish = async (formData) => {
  const response = await fetch(`${API_URL}/api/fish/${fishId}`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!responseBody.ok) throw new Error("Failed to fetch");
  return responseBody;
};

export const editFish = async (params, formData) => {
  const fishId = params.queryKey[1];
  const response = await fetch(`${API_URL}/api/fish/${fishId}`, {
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!responseBody.ok) throw new Error("Failed to fetch");
  return responseBody;
};
