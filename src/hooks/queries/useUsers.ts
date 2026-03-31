"use client";

import { getUsers } from "@/services/user.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useUsers = (page: number) => {
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
    placeholderData: keepPreviousData,
    staleTime: 5000,
    retry: 1,
  });
};
