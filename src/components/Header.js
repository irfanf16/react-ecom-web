import React, { useState } from "react";
import Logo from "../components/Logo";
import { GrSearch } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BackendApis from "../common/BackendRoutesPath";
import frontendRoutesPath from "../common/FrontendRoutesPath";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const Header = () => {

  const user=useSelector((state)=>state?.user?.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [menuShow,setMenuShow]=useState(false);

  const handleLogout =async()=>{
    const response= await fetch(BackendApis.logout.url,{
      method: BackendApis.logout.method,
      credentials:'include'
    });
    const data=await response.json();
    if(data.status === true){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate('/');
    }

  }


  return (
    <header className="h-16 bg-white shadow-md">
      <div className="container flex items-center justify-between h-full px-4 mx-auto">
        <div className="">
          <Link to={'/'}>
            <Logo w={50} h={50} />
          </Link>
        </div>

        <div className="items-center justify-between hidden w-full max-w-sm pl-2 border rounded-full lg:flex focus-within:shadow-md">
          <input
            placeholder="Search product here..."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[80px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          
          <div className="relative flex justify-center ">
            <div className="relative flex justify-center text-2xl cursor-pointer">
              {
                user?.profile_pic ? (
                  <img src={user?.profile_pic} alt="Profile" className="w-10 h-10 rounded-full" onClick={() => setMenuShow(prev => !prev)}/>
                )
                :
                  <FaUser />
              }
            </div>
            {
              menuShow && (
             <div className="absolute bottom-0 p-2 bg-white rounded shadow-lg top-11 h-fit"> 
               <nav>
               <Link to={frontendRoutesPath.admin.dashboard} className="p-2 whitespace-nowrap hover:bg-slate-100" onClick={() => setMenuShow(prev => !prev)}>Dashboard</Link>
               </nav>
            </div>
              )
            }
          
          </div>
         
          <div className="relative text-2xl">
            <span>
              <FaShoppingCart />
            </span>

            <div className="absolute flex items-center justify-center w-5 h-5 p-1 text-white bg-red-600 rounded-full -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>
            {
              user ? (
            <button onClick={handleLogout}  className="px-3 py-1 text-white bg-red-600 rounded-full hover:bg-red-700">Logout</button>
              ) 
              :
              <Link to={'login'} className="px-3 py-1 text-white bg-red-600 rounded-full hover:bg-red-700">Login</Link>
            }

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
