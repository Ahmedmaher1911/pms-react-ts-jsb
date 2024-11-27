import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout'
import Login from './modules/authentication/components/Login/Login'
import ForgetPassword from './modules/authentication/components/ForgetPassword/ForgetPassword'
import ResetPassword from './modules/authentication/components/ResetPassword/ResetPassword'
import VerifyAccount from './modules/authentication/components/VerifyAccount/VerifyAccount'
import ChangePassword from './modules/authentication/components/ChangePassword/ChangePassword'
import Register from './modules/authentication/components/Register/Register'
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/Dashboard'
import ProjectLists from './modules/project/components/ProjectLists/ProjectLists'
import TaskLists from './modules/tasks/components/TaskLists/TaskLists'
import UserLists from './modules/users/components/UserLists/UserLists'
import NotFound from './modules/shared/components/NotFound/NotFound'
import ProjectForm from './modules/project/components/ProjectForm/ProjectForm'
import TaskForm from './modules/tasks/components/TaskForm/TaskForm'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Login/>},
        {path: 'login', element: <Login/>},
        {path: 'register', element: <Register/>},
        {path: 'forget-password', element: <ForgetPassword/>},
        {path: 'reset-password', element: <ResetPassword/>},
        {path: 'verify-account', element: <VerifyAccount/>},
        {path: 'change-password', element: <ChangePassword/>}
      ]
    },
    {
      path: '/',
      element: <MasterLayout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Dashboard/>},
        {path: 'dashboard', element: <Dashboard/>},
        {path: 'projects', element: <ProjectLists/>},
        {path: 'create-project/:projectId', element: <ProjectForm/>},
        {path: 'tasks', element: <TaskLists/>},
        {path: 'create-task/:taskId', element: <TaskForm/>},
        {path: 'usres', element: <UserLists/>}
      ]
    }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
