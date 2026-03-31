import { searchUsers } from "@/services/user.service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useSearchUsers(query: string, page: number) {
  return useQuery({
    queryKey: ["users", "search", query, page],
    queryFn: () => searchUsers(query, page),
    enabled: !!query,
    placeholderData: keepPreviousData,
  });
}
