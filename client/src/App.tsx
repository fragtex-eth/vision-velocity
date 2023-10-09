
import Header from './components/Common/Header'
import DiscoverView from './views/Discover'
import Profile from './views/Profile'
import Project from './views/Project'
import Login from './views/Login'

function App() {
  return (
    <div className="min-h-screen overflow-y-hidden">
      <div className="ellipse -z-10"></div>
      {/* <Login/> */}
      <Header/>
      {/* <Project/>
      <Profile/> */}
      <DiscoverView/>
    </div>
  )
}

export default App
