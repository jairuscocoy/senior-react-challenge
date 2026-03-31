import { TUser } from "@/types/user-types";

type TGetUsersResponse = {
  users: TUser[];
  total: number;
  skip: number;
  limit: number;
};

export async function getUsers(page: number): Promise<TGetUsersResponse> {
  const limit = 10;
  const skip = (page - 1) * limit;
  const res = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);

  if (!res.ok) throw new Error("Failed to fetch users");

  return res.json();
}
