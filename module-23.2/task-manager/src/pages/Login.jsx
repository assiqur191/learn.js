import { Check, Mail, Lock, EyeOff, ArrowRight, Loader } from "lucide-react";
import bgImage from "../assets/Flowing background.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full text-blue-600 bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row items-center justify-between p-6 lg:p-16 relative overflow-hidden"
      style={{ backgroundImage: `url("${bgImage}")` }}
    >
      {/* ================= LEFT SIDE: Illustration & Branding ================= */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center lg:pr-12 space-y-8 z-10">
        {/* Top Logo Header */}
        <div className="inline-flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md flex items-center justify-center">
            <Check className="h-6 w-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-gray-900">Task</span>
            <span className="text-blue-600">Manager</span>
          </span>
        </div>

        {/* Dashboard Mockup & Floating Elements Container */}
        <div className="relative w-full max-w-2xl h-[380px] hidden sm:block">
          {/* Main Dashboard Preview Card */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/50 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 text-white p-1 rounded-lg">
                  <Check className="h-4 w-4" />
                </div>
                <span className="font-semibold text-gray-800 text-sm">
                  TaskManager
                </span>
              </div>
              <div className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                🔍 Search tasks...
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-lg">
                Good morning, Alex!
              </h3>
              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="bg-blue-50 p-2 rounded-xl border border-blue-100">
                  <span className="block text-xs text-blue-600 font-medium">
                    Total Tasks
                  </span>
                  <span className="text-lg font-bold text-blue-700">12</span>
                </div>
                <div className="bg-green-50 p-2 rounded-xl border border-green-100">
                  <span className="block text-xs text-green-600 font-medium">
                    Completed
                  </span>
                  <span className="text-lg font-bold text-green-700">8</span>
                </div>
                <div className="bg-purple-50 p-2 rounded-xl border border-purple-100">
                  <span className="block text-xs text-purple-600 font-medium">
                    In Progress
                  </span>
                  <span className="text-lg font-bold text-purple-700">3</span>
                </div>
                <div className="bg-orange-50 p-2 rounded-xl border border-orange-100">
                  <span className="block text-xs text-orange-600 font-medium">
                    Overdue
                  </span>
                  <span className="text-lg font-bold text-orange-700">1</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 text-xs text-gray-500 flex justify-between items-center">
              <span>✅ Finish project proposal</span>
              <span className="text-blue-600 font-medium">9:00 AM</span>
            </div>
          </div>

          {/* Floating Badge 1: Stay Consistent */}
          <div className="absolute -top-6 left-12 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white">
            <div className="bg-blue-100 text-blue-600 p-1.5 rounded-xl">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600">Stay consistent</p>
              <p className="text-[10px] text-gray-500">Build better habits</p>
            </div>
          </div>

          {/* Floating Badge 2: Small Steps */}
          <div className="absolute -bottom-4 left-16 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-white">
            <div className="bg-blue-600 text-white p-1.5 rounded-xl">
              <Check className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold text-gray-800">
              Small steps big results
            </p>
          </div>

          {/* Floating Calendar Widget */}
          <div className="absolute -right-6 top-8 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-xl w-56 border border-white">
            <div className="flex justify-between items-center mb-3 text-xs font-bold text-gray-800">
              <span>April 2025</span>
              <span>&lt; &gt;</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-500 font-medium">
              <span>Su</span>
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
              <span className="p-1 bg-blue-600 text-white rounded-full font-bold">
                16
              </span>
              <span className="p-1">17</span>
              <span className="p-1">18</span>
              <span className="p-1">19</span>
            </div>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-3">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="text-gray-900">Your goals.</span> <br />
            <span className="text-blue-600">Our priority.</span>
          </h1>
          <p className="text-gray-600 text-base max-w-md">
            Log in to access your tasks, track your progress, and stay on top of
            what matters.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE: Login Card Form ================= */}
      <div className="w-full lg:w-2/5 flex justify-center lg:justify-end z-10 mt-8 lg:mt-0">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl border border-white/80">
          {/* Card Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-600 text-white p-2 rounded-xl">
              <Check className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg text-gray-900">TaskManager</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Log in to continue managing your tasks.
          </p>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-gray-400 hover:text-gray-600">
                  <EyeOff className="h-4 w-4" />
                </span>
              </div>
              {/* Optional Error Message matching design */}
              {/* <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                ⚠️ Incorrect email or password. Please try again.
              </p> */}
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-500">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition duration-200"
            >
              {loading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Log In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center text-xs text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create one
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
