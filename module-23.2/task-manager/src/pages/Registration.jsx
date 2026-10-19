// import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  Check,
  User,
  Mail,
  Lock,
  EyeOff,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termAccepted, setTermAccepted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password.length < 6)
      return setError("Password must be at least 6 characters long.");
    if (password !== confirmPassword) return setError("Password didnt match");
    if (!termAccepted) {
      setError("Please accept the Terms and Privacy Policy.");
      return;
    }
    setLoading(true);

    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row items-center justify-between p-6 lg:p-16 relative overflow-hidden"
      style={{ backgroundImage: `url('/Flowing background.svg')` }}
    >
      {/* ================= LEFT SIDE: Illustration & Tagline ================= */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center lg:pr-12 space-y-8 z-10">
        {/* Top Logo Header */}
        <div className="inline-flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2.5 rounded-2xl shadow-md flex items-center justify-center">
            <Check className="h-6 w-6 stroke-[3]" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-gray-900">Task</span>
            <span className="text-blue-600">Manager</span>
          </span>
        </div>

        {/* Dashboard Mockup & Floating Elements Container */}
        <div className="relative w-full max-w-2xl h-[380px] hidden sm:block">
          {/* Main Dashboard Task List Preview */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/50 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 text-white p-1 rounded-lg">
                  <Check className="h-4 w-4" />
                </div>
                <span className="font-semibold text-gray-800 text-sm">
                  My Tasks
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="bg-white rounded-xl p-2.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5 text-xs text-gray-800 font-medium">
                  <span className="bg-green-500 text-white p-0.5 rounded">
                    <Check className="h-3 w-3" />
                  </span>
                  Finish project proposal
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  Completed
                </span>
              </div>
              <div className="bg-white rounded-xl p-2.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5 text-xs text-gray-800 font-medium">
                  <span className="bg-green-500 text-white p-0.5 rounded">
                    <Check className="h-3 w-3" />
                  </span>
                  Team standup meeting
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  Completed
                </span>
              </div>
              <div className="bg-white rounded-xl p-2.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5 text-xs text-gray-800 font-medium">
                  <span className="border border-gray-300 w-4 h-4 rounded inline-block"></span>
                  Update documentation
                </div>
                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                  Today
                </span>
              </div>
            </div>

            <div className="bg-blue-50/60 rounded-2xl p-3 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-800">
                Daily Progress
              </span>
              <span className="text-xs text-blue-600 font-semibold">
                4 of 6 tasks completed
              </span>
            </div>
          </div>

          {/* Floating Badge: Make progress every day */}
          <div className="absolute -top-6 right-24 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border border-white">
            <div className="bg-blue-600 text-white p-1.5 rounded-xl">
              <Check className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Make progress</p>
              <p className="text-[10px] text-gray-500">every day</p>
            </div>
          </div>

          {/* Floating Calendar Widget */}
          <div className="absolute -right-4 top-12 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-xl w-56 border border-white">
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
              <span className="p-1">13</span>
              <span className="p-1">14</span>
              <span className="p-1">15</span>
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
            <span className="text-gray-900">Small steps today,</span> <br />
            <span className="text-blue-600">big goals tomorrow.</span>
          </h1>
          <p className="text-gray-600 text-base max-w-md">
            Join TaskManager and take control of your tasks, productivity and
            personal growth.
          </p>
        </div>
      </div>

      {/* ================= RIGHT SIDE: Register Card Form ================= */}
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
            Create your account
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Start organizing your day and achieving more.
          </p>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
              </div>
            </div>

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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-gray-400 hover:text-gray-600">
                  <EyeOff className="h-4 w-4" />
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">
                Password must be at least 6 characters long.
              </p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                />
                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center cursor-pointer text-gray-400 hover:text-gray-600">
                  <EyeOff className="h-4 w-4" />
                </span>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={termAccepted}
                onChange={(e) => setTermAccepted(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="terms" className="text-xs text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
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
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition duration-200 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white/95 px-2 text-gray-400">or</span>
            </div>
          </div>

          {/* Footer Link */}
          <div className="text-center text-xs text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
