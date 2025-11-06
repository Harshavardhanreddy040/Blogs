import React, { useState } from 'react'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCamera } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { registerUser } from '../slice/slice'

const Register = () => {
  
  const [showPassword, setShowPassword] = useState(false)
  const dispatch=useDispatch()
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    profileImage: null, name: '', email: '', password: '', confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setForm(prev => ({ ...prev, [name]: files ? files[0] : value }))
    // Clear error when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const newErrors = {}
   const nameRegex = /^[A-Za-z]+$/;

  if (!nameRegex.test(form.name)) {
    console.log("❌ Invalid name");
    newErrors.name='Name is Invalid'
  } else {
    console.log("✅ Valid name");
  }

    if (!form.email) newErrors.email = 'Email is required'
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)) newErrors.email = 'Email is invalid'
    if (!form.password) newErrors.password = 'Password is required'
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password)) newErrors.password = <ul>
      <ol>at least one lowercase letter</ol>
      <ol>at least one uppercase letter</ol>
      <ul>at least one digit</ul>
      <li>at least one special character</li>
    </ul>
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      console.log('Form submitted:', form)
      dispatch(registerUser(form))
      // API call here
    }
  }

  return (
    <div className="min-h-screen bg-[url('/image.png')] bg-cover bg-center flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden w-full max-w-5xl md:h-[90vh]">
        
        <div className="md:w-1/2 w-full h-56 md:h-full">
          <img src="/reggi.png" alt="Register" className="h-full w-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 w-full p-6 sm:p-8 bg-white/70 backdrop-blur-md flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-700 mb-6">
            Create Your Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-3">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {form.profileImage ? (
                    <img src={URL.createObjectURL(form.profileImage)} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="text-2xl text-white" />
                  )}
                </div>
                <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full cursor-pointer shadow-md hover:bg-purple-600 transition">
                  <FaCamera className="text-xs" />
                  <input type="file" id="profileImage" name="profileImage" className="hidden" accept="image/*" onChange={handleChange} />
                </label>
              </div>
            </div>

            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-indigo-500" />
              <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm" />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-indigo-500" />
              <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange} className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-indigo-500" />
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-indigo-500 hover:text-indigo-700">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-indigo-500" />
              <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 shadow-sm" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-indigo-500 hover:text-indigo-700">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-semibold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-700 text-sm">
              Already have an account? <button className="text-indigo-700 hover:underline font-semibold">Sign in here</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register