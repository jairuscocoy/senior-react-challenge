"use client";

import { useUsers } from "@/hooks/queries/useUsers";
import { useRouter } from "next/navigation";

export default function UsersList({ page }: { page: number }) {
  const router = useRouter();
  const { data, isLoading } = useUsers(page);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Users</h1>
      {data?.users.map((user) => (
        <div key={user.id}>{user.firstName}</div>
      ))}
    </div>
  );
}
