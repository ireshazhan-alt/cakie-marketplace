import { Button } from "@/components/ui/button";

const users = [
  {
    id: "USR001",
    name: "Nethmi Perera",
    email: "nethmi@gmail.com",
    role: "Customer",
    status: "Active",
  },
  {
    id: "USR002",
    name: "Cake Bliss",
    email: "cakebliss@gmail.com",
    role: "Seller",
    status: "Active",
  },
  {
    id: "USR003",
    name: "Ayesha Fernando",
    email: "ayesha@gmail.com",
    role: "Customer",
    status: "Blocked",
  },
];

const ManageUsers = () => {
  return (
    <div className="min-h-screen bg-[#fff7f1] px-4 py-28">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#5c4033]">
            Manage Users
          </h1>
          <p className="text-gray-500 mt-2">
            View customers, sellers, and manage user access.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md shadow rounded-2xl overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-6 py-4 font-semibold text-[#5c4033] border-b">
            <p>User ID</p>
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
            <p>Actions</p>
          </div>

          {users.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-5 gap-4 px-6 py-4 items-center border-b last:border-b-0 text-sm"
            >
              <p className="text-gray-500">{user.id}</p>
              <p className="font-medium text-[#5c4033]">{user.name}</p>
              <p className="text-gray-500">{user.email}</p>
              <div>
                <span className="px-3 py-1 rounded-full bg-[#f4dfd0] text-[#8a5438]">
                  {user.role}
                </span>
              </div>

              <div className="flex gap-2">
                <Button className="bg-[#c7825a] hover:bg-[#a96846] rounded-full">
                  View
                </Button>

                <Button
                  className={
                    user.status === "Blocked"
                      ? "bg-green-600 hover:bg-green-700 rounded-full"
                      : "bg-red-500 hover:bg-red-600 rounded-full"
                  }
                >
                  {user.status === "Blocked" ? "Unblock" : "Block"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;