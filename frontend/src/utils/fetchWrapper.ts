export const fetchWrapper = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const modifiedOptions: RequestInit = {
    ...options,
    headers,
  };

  return fetch(url, modifiedOptions);
};
