
import Header from './components/Common/Header'
import DiscoverView from './views/Discover'
import { Outlet } from 'react-router-dom';
import Profile from './views/Profile'
import Project from './views/Project'
import Login from './views/Login'

//any
function App() {
  return (
    <div className="min-h-screen overflow-y-hidden">
      <div className="ellipse -z-10"></div>
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
