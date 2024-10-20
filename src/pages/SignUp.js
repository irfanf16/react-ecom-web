import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import base64 from "../helpers/Base64";
import BackendApis from "../common/BackendRoutesPath";
import frontendRoutesPath from "../common/BackendRoutesPath";
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    profile_pic: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!data.name) {
      newErrors.name = "Name is required";
    } else if (data.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (data.password !== data.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(BackendApis.register.url, {
        method: BackendApis.register.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.status) {
        toast.success("User created successfully");
        navigate("/login");
      } else {
        setErrors({ response_error: result.message });
      }
    } catch (error) {
      setErrors({ response_error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePic = async (e) => {
    const file = e.target.files[0];
    const image = await base64(file);
    setData((prev) => ({ ...prev, profile_pic: image }));
  };

  return (
    <section id="signUp">
      <div className="container p-4 mx-auto">
        <div className="w-full max-w-sm p-5 mx-auto bg-white">
          <div className="relative w-20 h-20 mx-auto overflow-hidden rounded-full">
            <img src={data.profile_pic || loginIcon} alt="Profile" className="object-cover w-full h-full" />
            <form>
              <label>
                <div className="absolute bottom-0 w-full pt-2 pb-4 text-xs text-center cursor-pointer bg-opacity-80 bg-slate-200">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleChangePic} />
              </label>
            </form>
          </div>

          <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="p-2 bg-slate-100">
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  className="w-full h-full bg-transparent outline-none"
                />
              </div>
              {errors.name && <p className="text-red-600">{errors.name}</p>}
            </div>

            <div className="grid">
              <label>Email:</label>
              <div className="p-2 bg-slate-100">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="w-full h-full bg-transparent outline-none"
                />
              </div>
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label>Password:</label>
              <div className="flex p-2 bg-slate-100">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full h-full bg-transparent outline-none"
                />
                <div className="cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
                  <span className="text-1xl">{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              {errors.password && <p className="text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label>Confirm Password:</label>
              <div className="flex p-2 bg-slate-100">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password"
                  name="confirm_password"
                  value={data.confirm_password}
                  onChange={handleChange}
                  className="w-full h-full bg-transparent outline-none"
                />
                <div className="cursor-pointer" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  <span className="text-1xl">{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}</span>
                </div>
              </div>
              {errors.confirm_password && <p className="text-red-600">{errors.confirm_password}</p>}
            </div>

            {errors.response_error && <p className="text-red-600">{errors.response_error}</p>}

            <button
              type="submit"
              className={`bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 flex justify-center items-center ${
                loading ? "opacity-75" : ""
              }`}
              disabled={loading}
              style={{ minHeight: "50px" }}
            >
              <span>Sign Up</span>
              {loading && (
                <div className="w-5 h-5 ml-2 border-4 border-t-4 border-gray-300 rounded-full border-t-white animate-spin"></div>
              )}
            </button>
          </form>

          <p className="my-5">
            Do you have an account?
            <Link to={frontendRoutesPath.login} className="hover:text-red-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
