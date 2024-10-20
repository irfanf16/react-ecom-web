import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import frontendRoutesPath from "../common/FrontendRoutesPath";
const ProtectedRoutes =({children,allowRole})=>{

    const user=useSelector((state)=>state?.user?.user);
    
    if(user){

        const role=user?.role;
        if(role !== allowRole){
            return <Navigate to={frontendRoutesPath.home}/>
        }
        return children;

    }
    

}
export default ProtectedRoutes;