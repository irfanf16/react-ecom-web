import React from "react";
import Sidebar from "./Sidebar";


const Layout = ({children}) => {

  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      <Sidebar/>
      <main className="w-full p-3">
       {children}
      </main>
    </div>
  );
};

export default Layout;
