import { ActionFunctionArgs, json } from "react-router-dom";

export const registerUser = async ({ request }: ActionFunctionArgs) => {
  const data = await request.formData();
  const method = request.method;
  const url = `${process.env.REACT_APP_BASE_API_URL}/register`;

  const eventData = {
    username: data.get("username"),
    email: data.get("email"),
    password: data.get("password"),
    password_confirmation: data.get("password2"),
  };
  console.log(eventData);

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (
    response.status === 401 ||
    response.status === 404 ||
    response.status === 400
  ) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not comunicate with the server!" },
      { status: 500 },
    );
  }

  return response;
};
