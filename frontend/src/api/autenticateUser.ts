import { ActionFunctionArgs, json, redirect } from "react-router-dom";

export async function autenticateUser({ request }: ActionFunctionArgs) {
  const data = await request.formData();
  const method = request.method;
  const url = `${process.env.REACT_APP_BASE_API_URL}/login`;

  const eventData = {
    username: data.get("username"),
    password: data.get("password"),
  };

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

  const { token } = await response.json();
  localStorage.setItem("token", token);
  return redirect("/market");
}
