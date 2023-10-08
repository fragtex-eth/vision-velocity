
import Header from './components/Common/Header'
import DiscoverView from './views/Discover'
import Profile from './views/Profile'
import Project from './views/Project'

function App() {
  return (
    <div className="min-h-screen">
      <div className="ellipse -z-10"></div>
      <Header/>
      <Project/>
      {/* <Profile/> */}
      {/* <DiscoverView/> */}
    </div>
  )
}

export default App
