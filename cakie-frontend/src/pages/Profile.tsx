import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#fff7f1] px-4 py-28">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#5c4033] mb-2">
            My Profile
          </h1>

          <p className="text-gray-500 mb-8">
            View and update your personal details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <Input className="mt-2" type="text" defaultValue="Iresha Fernando" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <Input className="mt-2" type="email" defaultValue="iresha@gmail.com" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <Input className="mt-2" type="text" defaultValue="0771234567" />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">
                Role
              </label>
              <Input className="mt-2" type="text" defaultValue="Customer" disabled />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-600">
                Address
              </label>
              <Input
                className="mt-2"
                type="text"
                defaultValue="Maharagama, Colombo"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <Button className="bg-[#c7825a] hover:bg-[#a96846] px-8">
              Update Profile
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
          <div className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-5">
            <p className="text-sm text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold text-[#5c4033] mt-2">12</h2>
          </div>

          <div className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-5">
            <p className="text-sm text-gray-500">Pending Orders</p>
            <h2 className="text-3xl font-bold text-[#5c4033] mt-2">2</h2>
          </div>

          <div className="bg-white/80 backdrop-blur-md shadow rounded-2xl p-5">
            <p className="text-sm text-gray-500">Completed Orders</p>
            <h2 className="text-3xl font-bold text-[#5c4033] mt-2">10</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;