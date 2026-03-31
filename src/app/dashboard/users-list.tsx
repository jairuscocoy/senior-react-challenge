"use client";

import { useUsers } from "@/hooks/queries/useUsers";
import { useRouter } from "next/navigation";

export default function UsersList({ page }: { page: number }) {
  const router = useRouter();
  const { data, isLoading } = useUsers(page);
  if (isLoading) return <p>Loading...</p>;

  console.log(data);
  const totalPages = Math.ceil((data?.total ?? 0) / 10);
  const handleGoToPage = (newPage: number) => {
    router.push(`/dashboard?page=${newPage}`);
  };

  return (
    <div>
      {data?.users.map((user) => (
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
