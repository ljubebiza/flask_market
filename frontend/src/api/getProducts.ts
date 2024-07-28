export const getProducts = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/market`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error(await response.json());
    return { items: [] };
  }

  const showData = await response.json();
  const {
    data: { items },
  } = showData;
  return items;
};
