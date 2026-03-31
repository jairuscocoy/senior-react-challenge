"use client";

import { getUsers } from "@/services/user.service";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useUsers = (page: number) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
    placeholderData: () => queryClient.getQueryData(["users", page - 1]),
    staleTime: 5000,
    retry: 1,
  });
};
