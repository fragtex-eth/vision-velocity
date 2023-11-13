import Header from "./components/Common/Header";
import DiscoverView from "./views/Discover";
import { Outlet } from "react-router-dom";
import Profile from "./views/Profile";
import Project from "./views/Project";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import CreateProfile from "./views/EditProfile";
import CreateProject from "./views/CreateProject";
import BackgroundLines from "./assets/bgLines.svg";
import { useModal } from "./context/modalContext";
import Register from "./views/Register";
import Login from "./views/Login";
import EditProfile from "./views/EditProfile";
import CreateProject2 from "./views/CreateProject2";
import CreateProject3 from "./views/CreateProject3";
//any
function App() {
  const location = useLocation();
  const { modalType } = useModal();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen overflow-y-hidden">
      <img
        className="ml-50 absolute -z-10 mt-32 w-screen"
        src={BackgroundLines}
      ></img>
      <div className="ellipse -z-10"></div>
      {/* <CreateProfile/> */}
      {/* <CreateProject/> */}
      {modalType === "register" && <Register />}
      {modalType === "login" && <Login />}
      {modalType === "editProfile" && <EditProfile />}
      {modalType === "createProject" && <CreateProject3 />}
      <Header />

      <Outlet />
      {/* <Register/> */}
    </div>
  );
}

export default App;
