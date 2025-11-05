import React, { useState } from 'react'
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCamera,
} from "react-icons/fa";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="min-h-screen bg-[url('/image.png')] bg-cover bg-center flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="flex flex-col md:flex-row bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden w-full max-w-5xl border border-white/30 transition-all duration-300 hover:scale-[1.01] md:h-[90vh]">
        
        {/* Left Image Section */}
        <div className="md:w-1/2 w-full h-56 md:h-full">
          <img
            src="/reggi.png"
            alt="Register Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full p-6 sm:p-8 bg-white/70 backdrop-blur-md flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-6">
            Create Your Account
          </h2>

          <form className="space-y-4">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-3">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  <FaUser className="text-2xl text-white" />
                </div>
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-purple-600 transition"
                >
                  <FaCamera className="text-xs" />
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-600 mt-1 font-medium">
                Upload profile picture
              </p>
            </div>

            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-indigo-500" />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-indigo-500" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-indigo-500" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-indigo-500 hover:text-indigo-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-indigo-500" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-indigo-500 hover:text-indigo-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-4 text-center">
            <p className="text-gray-700 text-sm">
              Already have an account?{" "}
              <button className="text-indigo-700 hover:underline font-semibold">
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register