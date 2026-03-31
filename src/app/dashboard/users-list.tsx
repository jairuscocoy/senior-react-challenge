"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
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
      <Table className="w-3/4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Given name</TableHead>
            <TableHead>Family name</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone number</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{`${user.address?.address}, ${user.address?.city}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-right">
              Page {page} of {totalPages}
            </TableCell>
            <TableCell className="text-left gap-2">
              <Button
                onClick={() => handleGoToPage(page - 1)}
                variant="outline"
                disabled={page === 1}
              >
                Prev
              </Button>
              <Button
                onClick={() => handleGoToPage(page + 1)}
                variant="default"
                disabled={page === totalPages}
              >
                Next
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
