import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import Dashboard from './Components/Dashboard.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Todo from './Components/Todo.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import NotFound from './Components/NotFound.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/dashboard',
    element:(
      <ProtectedRoute>
        <Dashboard/>
      </ProtectedRoute>
    )
  },
  {
    path:'/todo/:boardId',
    element:(
      <ProtectedRoute>
        <Todo/>
      </ProtectedRoute>
    )
  },
  {
    path:'*',
    element:<NotFound/>
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
