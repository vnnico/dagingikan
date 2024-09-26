const API_URL = import.meta.env.VITE_API_BASE_URL;

export const orderItems = async (formData) => {
  console.log(formData);
  const response = await fetch(`${API_URL}/api/order`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error("Failed to fetch");

  return responseBody;
};
