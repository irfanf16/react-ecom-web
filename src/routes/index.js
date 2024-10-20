import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/admin/Dashboard";
import frontendRoutesPath from "../common/FrontendRoutesPath";
import Users from "../pages/admin/Users";
import Products from "../pages/admin/Products";
import ProtectedRoutes from "../common/ProtectedRoutes";

const router=createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path:frontendRoutesPath.home,
                element:<Home />
            },
            {
                path:frontendRoutesPath.login,
                element:<Login />
            },
            {
                path:frontendRoutesPath.forgotPassword,
                element:<ForgetPassword />
            },
            {
                path:frontendRoutesPath.signUp,
                element:<SignUp/>
            },
            
            // admin routes
            {
                path:frontendRoutesPath.admin.dashboard,
                element:(
                    <ProtectedRoutes allowRole={'admin'}>
                        <Dashboard/>
                    </ProtectedRoutes>
                )
            },
            {
                path:frontendRoutesPath.admin.users,
                element:(
                    <ProtectedRoutes allowRole={'admin'}>
                        <Users/>
                    </ProtectedRoutes>
                )
              
            },
            {
                path:frontendRoutesPath.admin.products,
                element:(
                    <ProtectedRoutes allowRole={'admin'}>
                        <Products/>
                    </ProtectedRoutes>
                )
              
            },

        ]
    }
]);

export default router;