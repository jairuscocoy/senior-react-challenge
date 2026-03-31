"use client";

import { useUsers } from "@/hooks/queries/useUsers";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
export default function UsersList({ page }: { page: number }) {
  const router = useRouter();
  const { data, isLoading, isSuccess } = useUsers(page);
  const [filterGender, setFilterGender] = useState<string>("");

  const filteredData = useMemo(() => {
    if (!isSuccess || !data?.users) return [];

    if (!filterGender) return data.users;

    return data.users.filter((user) => user.gender === filterGender);
  }, [data?.users, filterGender, isSuccess]);

  if (isLoading) return <p>Loading...</p>;

  const totalPages = Math.ceil((data?.total ?? 0) / 10);

  const handleGoToPage = (newPage: number) => {
    router.push(`/dashboard?page=${newPage}`);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Users</h1>
      <label>Filter by gender: </label>
      <select
        id="gender-select"
        value={filterGender}
        onChange={(e) => setFilterGender(e.target.value)}
      >
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {filteredData?.map((user) => (
        <div key={user.id}>{user.firstName}</div>
      ))}
      <div>
        <button onClick={() => handleGoToPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="bg-blue-600"
          onClick={() => handleGoToPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
