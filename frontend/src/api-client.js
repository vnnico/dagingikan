const API_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const login = async (formData) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_URL}/api/auth/validateToken`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid Token");
  }

  return response.json();
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }

  return response.json();
};

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
