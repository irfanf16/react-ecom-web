import React, { useContext, useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import backendApis from "../common/BackendRoutesPath";
import frontendRoutesPath from "../common/FrontendRoutesPath";
import { toast } from 'react-toastify';
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const {getUser}=useContext(Context)
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const validate = () => {
    const newErrors = {};
  
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    setLoading(true);
    try {
      const response=await fetch(backendApis.login.url,{
        method:backendApis.login.method,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      const result=await response.json();
      if (response.ok && result.status) {
        toast.success("User login successfully");
        getUser();
        if(result.user.role === 'admin'){
          navigate(frontendRoutesPath.admin.dashboard);
        }else{
          navigate("/");
        }
        
      } else {
        setErrors({ response_error: result.message });
      }
      
    } catch (error) {
      setErrors({ response_error: error.message });
    } finally {
      setLoading(false);
    }

    
  };
  return (
    <section id="login">
      <div className="container p-4 mx-auto">
        <div className="w-full max-w-sm p-5 mx-auto bg-white">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="logo" />
          </div>
          <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
            <div className="grid">
              <label className="">Email:</label>
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
              <label className="">Password:</label>
              <div className="flex p-2 bg-slate-100">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  className="w-full h-full bg-transparent outline-none"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span className="text-1xl">
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>
              {errors.password && <p className="text-red-600">{errors.password}</p>}
              <Link
                to={frontendRoutesPath.forgotPassword}
                className="block ml-auto w-fit hover:text-red-600 hover:underline"
              >
                <p className="text-sm ">Forgot Password?</p>
              </Link>
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
              <span>Login</span>
              {loading && (
                <div className="w-5 h-5 ml-2 border-4 border-t-4 border-gray-300 rounded-full border-t-white animate-spin"></div>
              )}
            </button>
          </form>
          <p className="my-5">
            Don't have account ?{" "}
            <Link to={frontendRoutesPath.register} className="hover:text-red-700">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
