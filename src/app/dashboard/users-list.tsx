"use client";

import { useUsers } from "@/hooks/queries/useUsers";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchUsers } from "./queries/useSearchUsers";
import { TUser } from "@/types/user-types";
import { UserItem } from "./components/user-item";
import { UserModal } from "@/components/ui/modals";
import { Button } from "@/components/ui/buttons";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { Input } from "@/components/ui/search-component";
import { Spinner } from "@/components/ui/spinner";
export default function UsersList({ page }: { page: number }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [filterGender, setFilterGender] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const debouncedSearch = useDebounce(search, 500);
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

  //HANDLE SEE DETAILS
  const handleSeeDetails = useCallback((user: TUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (isLoading) return <Spinner />;

  const totalPages = Math.ceil((data?.total ?? 0) / 10);

  const handleGoToPage = (newPage: number) => {
    router.push(`/dashboard?page=${newPage}`);
  };

  return (
    <div className="flex flex-col gap-4 p-6 mx-auto bg-white rounded-xl shadow-sm border border-slate-200">
      {search.length > 0 && (
        <div className="h-8">
          <h1 className="text-sm font-medium text-slate-600">
            You&apos;ve searched keyword for:{" "}
            <span className="text-blue-600 font-bold">&quot;{search}&quot;</span>
          </h1>
        </div>
      )}
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-1/4"
      />
      <div className="flex items-center gap-3 w-1/4">
        <label
          htmlFor="gender-select"
          className="text-sm font-semibold text-slate-700 whitespace-nowrap"
        >
          Filter by gender:
        </label>
        <select
          id="gender-select"
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
          className="flex-1 bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 cursor-pointer transition-colors hover:bg-slate-100"
        >
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      {/* NO USER FOUND */}
      {filteredData.length === 0 && <h1>No user found</h1>}
      {/* MODAL HERE */}
      {isModalOpen && <UserModal user={selectedUser} onClose={closeModal} />}
      {/* RENDER DATA */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Given name
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Family name
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Age
              </th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Gender
              </th>
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {/* MAP YOUR USERS HERE */}
            {filteredData.map((user: TUser) => (
              <UserItem key={user.id} user={user} onClick={handleSeeDetails} />
            ))}
          </tbody>
        </table>
      </div>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 w-1/3">
          <Button
            variant="secondary"
            onClick={() => handleGoToPage(page - 1)}
            disabled={page === 1}
            className="text-sm"
          >
            <ArrowLeftIcon />
            Prev
          </Button>
          <span className="text-sm font-medium text-slate-500">
            Page <span className="text-slate-900">{page}</span> of{" "}
            <span className="text-slate-900">{totalPages}</span>
          </span>
          <Button
            variant="primary"
            onClick={() => handleGoToPage(page + 1)}
            disabled={page === totalPages}
            className="text-sm"
          >
            Next
            <ArrowRightIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
