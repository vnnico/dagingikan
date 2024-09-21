const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllFish = async () => {
  const response = await fetch(`${API_URL}/api/fish`, {
    include: "credentials",
  });

  const responseBody = response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return responseBody;
};

export const getFish = async (params) => {
  console.log(params);
  const fishId = params.queryKey[1];
  const response = await fetch(`${API_URL}/api/fish/${fishId}`);

  const responseBody = response.json();
  if (!response.ok) throw new Error("Failed to fetch");
  return responseBody;
};
