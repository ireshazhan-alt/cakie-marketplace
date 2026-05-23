import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Cake,
  Eye,
  EyeOff,
  Home,
  Lock,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);

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
          phone: formData.phone,
          address: formData.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff7f1] px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none fixed -right-32 -top-40 h-[420px] w-[420px] rounded-full bg-[#ffd6e4]/70 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-[#d4a45f]/20 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] bg-white/70 shadow-elevated backdrop-blur-xl lg:grid-cols-[1fr_1.1fr]">
          <div className="relative hidden bg-gradient-to-br from-[#fff0f4] via-[#fff8f1] to-[#f7d7c6] p-10 lg:block">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-[#ffd6e4]/70 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#d4a45f]/30 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
              <button
                onClick={() => navigate("/")}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-chocolate shadow-soft hover:bg-white"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </button>

              <div>
                <div className="mb-6 grid h-20 w-20 place-items-center rounded-[1.7rem] bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/60 text-chocolate shadow-elevated">
                  <Cake size={38} strokeWidth={1.5} />
                </div>

                <h1 className="font-display text-5xl font-semibold leading-tight text-chocolate">
                  Join the sweetest marketplace.
                </h1>

                <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
                  Create your Cakie account to explore cakes, place orders, and
                  keep track of your sweet celebrations.
                </p>
              </div>

              <div className="rounded-3xl bg-white/60 p-5 shadow-soft">
                <p className="font-display text-xl text-chocolate">
                  Fresh cakes, happy moments.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your account will be created as a customer account.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <button
              onClick={() => navigate("/")}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#fff7f1] px-4 py-2 text-sm font-medium text-chocolate shadow-soft hover:bg-[#fff0f4] lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <div className="mb-7 text-center lg:text-left">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#ffd6c7] to-[#d4a45f]/60 text-chocolate shadow-soft lg:mx-0">
                <UserRound className="h-6 w-6" />
              </div>

              <h1 className="font-display text-4xl font-semibold text-chocolate">
                Create Account
              </h1>

              <p className="mt-2 text-sm text-muted-foreground">
                Register to continue with Cakie.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                  <UserRound className="h-4 w-4" />
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-white/70"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                  <Mail className="h-4 w-4" />
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/70"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                  <Lock className="h-4 w-4" />
                  Password
                </label>

                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-white/70 pr-11"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#5c4033]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </label>
                <Input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-white/70"
                />
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-[#5c4033]">
                  <MapPin className="h-4 w-4" />
                  Address
                </label>
                <Input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                  className="bg-white/70"
                />
              </div>

              {message && (
                <p className="rounded-2xl bg-[#fff7f1] px-4 py-3 text-center text-sm text-[#8a5438]">
                  {message}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#c7825a] py-6 text-base hover:bg-[#a96846]"
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-[#c7825a]">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;