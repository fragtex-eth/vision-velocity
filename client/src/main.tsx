import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Profile from './views/Profile'
import Project from './views/Project'
import DiscoverView from './views/Discover'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error 404</div>,
    children:[
      {
        path: "/",
        element: <DiscoverView/>
      },
      {
        path: "/project/:id",
        element: <Project/>,
        errorElement: <div>Project Id not found</div>,
      },
      {
        path: "/profile/:id",
        element: <Profile/>,
        errorElement: <div>Profile not found</div>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
