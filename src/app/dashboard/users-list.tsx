"use client";

import { useUsers } from "@/hooks/queries/useUsers";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSearchUsers } from "./queries/useSearchUsers";
import { TUser } from "@/types/user-types";
export default function UsersList({ page }: { page: number }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [filterGender, setFilterGender] = useState<string>("");
  const searchResults = useSearchUsers(debouncedSearch, page);
  const allUsersResults = useUsers(page);
  const { data, isLoading, isSuccess, isFetching } = debouncedSearch
    ? searchResults
    : allUsersResults;

  // RESET TO PAGE 1 WHEN SEARCHING
  useEffect(() => {
    router.push(`/dashboard?page=1`);
  }, [debouncedSearch, router]);

  // FILTER GENDER
  const filteredData = useMemo(() => {
    if (!isSuccess || !data?.users) return [];

    if (!filterGender) return data.users;

    return data.users.filter((user: TUser) => user.gender === filterGender);
  }, [data?.users, filterGender, isSuccess]);

  if (isLoading) return <p>Loading...</p>;

  const totalPages = Math.ceil((data?.total ?? 0) / 10);

  const handleGoToPage = (newPage: number) => {
    router.push(`/dashboard?page=${newPage}`);
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      {search.length > 0 ? <h1> You&apos;ve search keyword for {search}</h1> : null}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
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
      {/* NO USER FOUND */}
      {filteredData.length === 0 && <h1>No user found</h1>}
      {/* RENDER DATA */}
      {filteredData?.map((user: TUser) => (
        <div key={user.id}>{user.firstName}</div>
      ))}
      {isFetching && <p>Updating...</p>}
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
