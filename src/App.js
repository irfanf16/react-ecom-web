import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackendApis from "./common/BackendRoutesPath";
import { useEffect } from "react";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch=useDispatch();
  const getUser = async (e) => {
    const user = await fetch(BackendApis.user.url, {
      method: BackendApis.user.method,
      credentials: "include",
    });
    const data = await user.json();
    if(data.status === true){
      // console.log(data.data);
      dispatch(setUserDetails(data.data));
    }
  };

  useEffect(() => {
    console.log("function called");
    getUser();
  }, []); // Empty array ensures useEffect runs only once on mount

  return (
    <>
      <Context.Provider
        value={{
          getUser,
        }}
      >
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
