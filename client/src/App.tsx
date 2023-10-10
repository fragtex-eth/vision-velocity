
import Header from './components/Common/Header'
import DiscoverView from './views/Discover'
import { Outlet } from 'react-router-dom';
import Profile from './views/Profile'
import Project from './views/Project'
import Login from './views/Login'
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import CreateProfile from './views/CreateProfile';
import CreateProject from './views/CreateProject';
//any
function App() {
  const location = useLocation();
useEffect(() => {
  window.scrollTo(0,0);
}, [location]);
  return (
    <div className="min-h-screen overflow-y-hidden">
      <div className="ellipse -z-10"></div>
      {/* <CreateProfile/> */}
      <CreateProject/>
      <Header/>
      
      <Outlet/>
     
    </div>
  )
}

export default App
