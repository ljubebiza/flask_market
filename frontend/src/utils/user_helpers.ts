import { User } from "../types/user";

export const getLocalStorageUser = () => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      return JSON.parse(storedUser) as User;
    } catch (error) {
      console.error("Failed to parse JSON from localStorage:", error);
    }
  }
  return null;
};
