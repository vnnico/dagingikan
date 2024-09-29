const API_URL = import.meta.env.VITE_API_BASE_URL;

export const orderItems = async (formData) => {
  const response = await fetch(`${API_URL}/api/order`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "skip-browser-warning",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error("Failed to fetch");

  return responseBody;
};

export const getOrderStatus = async (params) => {
  const orderId = params.queryKey[1];
  const response = await fetch(
    `${API_URL}/api/order/check_order_status/${orderId}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "ngrok-skip-browser-warning": "skip-browser-warning",
      },
    }
  );

  const responseBody = await response.json();
  if (!response.ok) throw new Error("Failed to fetch");

  return responseBody;
};
