import UsersList from "./users-list";

function Dashboard({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page || 1);
  return <UsersList page={page} />;
}

export default Dashboard;
