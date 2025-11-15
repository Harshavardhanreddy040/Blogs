import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCamera,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { registerUser } from "../slice/slice";
import { Cropper, CircleStencil } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCropper, setShowCropper] = useState(false);
  const [cropImage, setCropImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const [form, setForm] = useState({
    profilePhoto: null,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const imageFile = files[0];
      setCropImage(URL.createObjectURL(imageFile));
      setShowCropper(true);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCrop = (cropperRef) => {
    if (cropperRef && cropperRef.getCanvas()) {
      const canvas = cropperRef.getCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedFile = new File([blob], "cropped-profile.jpg", {
            type: "image/jpeg",
          });
          setForm((prev) => ({ ...prev, profilePhoto: croppedFile }));
          setCroppedImage(URL.createObjectURL(croppedFile));
          setShowCropper(false);
        }
      }, "image/jpeg");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email is invalid";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", form);
      dispatch(registerUser(form));
    }
  };

  return (
    <div className="min-h-screen bg-[url('/image.png')] bg-cover bg-center flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden w-full max-w-5xl md:h-[90vh]">
        <div className="md:w-1/2 w-full h-56 md:h-full">
          <img
            src="/reggi.png"
            alt="Register"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="md:w-1/2 w-full p-6 sm:p-8 bg-white/70 backdrop-blur-md flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-6">
            Create Your Account
          </h2>

          {showCropper && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-xl shadow-lg max-w-lg w-full">
                <h3 className="text-center text-xl font-semibold mb-3 text-indigo-700">
                  Crop your profile photo
                </h3>
                <div className="h-80">
                  <Cropper
                    src={cropImage}
                    stencilComponent={CircleStencil}
                    className="cropper"
                    ref={(ref) => (window.cropperRef = ref)}
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setShowCropper(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleCrop(window.cropperRef)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                  >
                    Crop
                  </button>
                </div>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center mb-3">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {croppedImage ? (
                    <img
                      src={croppedImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-2xl text-white" />
                  )}
                </div>
                <label
                  htmlFor="profilePhoto"
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-purple-600 transition"
                >
                  <FaCamera className="text-xs" />
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-indigo-500" />
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={form.username}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-indigo-500" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-indigo-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-indigo-500 hover:text-indigo-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-indigo-500" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-indigo-500 hover:text-indigo-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
