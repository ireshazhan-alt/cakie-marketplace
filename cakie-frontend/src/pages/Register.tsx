import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "customer",
          phone: formData.phone,
          address: formData.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff7f1] px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-[#5c4033] mb-2">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Join Cakie and start ordering your favorite cakes
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          {message && (
            <p className="text-sm text-center text-[#8a5438]">{message}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c7825a] hover:bg-[#a96846]"
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

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