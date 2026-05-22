import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7f1] px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#5c4033] mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Join Cakie and start ordering your favorite cakes
        </p>

        <div className="space-y-4">
          <Input type="text" placeholder="Full name" />
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Password" />
          <Input type="text" placeholder="Phone number" />
          <Input type="text" placeholder="Address" />

          <Button className="w-full bg-[#c7825a] hover:bg-[#a96846]">
            Register
          </Button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-[#c7825a] font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;