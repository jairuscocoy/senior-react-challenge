import { TUser } from "@/types/user-types";

type TGetUsersResponse = {
  users: TUser[];
  total: number;
  skip: number;
  limit: number;
};
const limit = 10;

//get all user
export const getUsers = async (page: number): Promise<TGetUsersResponse> => {
  const skip = (page - 1) * limit;
  const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
};

//search user
export const searchUsers = async (q: string, page: number) => {
  const skip = (page - 1) * limit;
  const res = await fetch(`https://dummyjson.com/users/search?q=${q}&limit=${limit}&skip=${skip}`);

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
};
