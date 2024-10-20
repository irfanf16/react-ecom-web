import React from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import frontendRoutesPath from "../common/FrontendRoutesPath";

const Sidebar = () => {
  const user = useSelector((state) => state?.user?.user);
  const location = useLocation();
  const checkActiveRoute = (path) => {
    return location.pathname === path ? "bg-slate-200 font-bold" : "";
  };
  return (
    <aside className="w-full min-h-full bg-white max-w-60 sidebar">
      <div className="flex items-center justify-center h-32 flex-col ">
        <div className="relative flex justify-center text-2xl cursor-pointer">
          {user?.profile_pic ? (
            <img
              src={user?.profile_pic}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <FaUser />
          )}
        </div>
        <p className="capitalize text-lg font-semibold">{user?.name}</p>
        <p className="text-sm">{user?.role}</p>
      </div>
      <div>
        <nav className="grid p-4">
          <Link
            to={frontendRoutesPath.admin.dashboard}
            className={`px-2 py-1 hover:bg-slate-100 ${checkActiveRoute(
              frontendRoutesPath.admin.dashboard
            )}`}
          >
            Dashboard
          </Link>
          <Link
            to={frontendRoutesPath.admin.users}
            className={`px-2 py-1 hover:bg-slate-100 ${checkActiveRoute(
              frontendRoutesPath.admin.users
            )}`}
          >
            Users
          </Link>
          <Link
            to={frontendRoutesPath.admin.products}
            className={`px-2 py-1 hover:bg-slate-100 ${checkActiveRoute(
              frontendRoutesPath.admin.products
            )}`}
          >
            Products
          </Link>
        </nav>
      </div>
    </aside>
  );
};
export default Sidebar;
