import { json } from "react-router-dom";

export const itemActions = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  switch (intent) {
    case "purchase":
      await buyItem(formData);
      break;
    case "sell":
      await sellItem(formData);
      break;
    default:
      throw json({ message: "Invalid intent" }, { status: 400 });
  }

  return null;
};

const buyItem = async (data: FormData) => {
  const id = data.get("id");
  const quantity = data.get("quantity");
  const url = `${process.env.REACT_APP_BASE_API_URL}/market/purchase`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ id, quantity }),
  });

  return response;
};

const sellItem = async (data: FormData) => {
  const id = data.get("id");
  const quantity = data.get("quantity");
  const url = `${process.env.REACT_APP_BASE_API_URL}/market/sell`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "Application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ id, quantity }),
  });

  return response;
};
