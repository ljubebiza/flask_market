import { redirect } from "react-router-dom";

export async function logoutUser() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }
  const data = await response.json();
  console.log(data);

  alert(data.message);

  localStorage.removeItem("token");

  return redirect("/login");
}
