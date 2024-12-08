import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import Login from './modules/authentication/components/Login/Login';
import ForgetPassword from './modules/authentication/components/ForgetPassword/ForgetPassword';
import ResetPassword from './modules/authentication/components/ResetPassword/ResetPassword';
import VerifyAccount from './modules/authentication/components/VerifyAccount/VerifyAccount';
import ChangePassword from './modules/authentication/components/ChangePassword/ChangePassword';
import Register from './modules/authentication/components/Register/Register';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import Dashboard from './modules/Dashboard/Dashboard';
import ProjectLists from './modules/project/components/ProjectLists/ProjectLists';
import TaskLists from './modules/tasks/components/TaskLists/TaskLists';
import UserLists from './modules/users/components/UserLists/UserLists';
import NotFound from './modules/shared/components/NotFound/NotFound';
import ProjectForm from './modules/project/components/ProjectForm/ProjectForm';
import TaskForm from './modules/tasks/components/TaskForm/TaskForm';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './modules/shared/components/ProtectRoute/ProtectRoute';

interface Token {
  token: string;
}

function App() {
  // Declare loginData state and setLoginData function
  const [loginData, setLoginData] = useState<Token | null>(null);

  // Function to decode token and set login data
  const saveLoginData = () => {
    const decodeToken = localStorage.getItem("token");
    if (decodeToken) {
      const encodedToken: Token = jwtDecode(decodeToken);
      setLoginData(encodedToken);
    }
  };

  // Load login data on initial render if token exists in localStorage
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  // Define the routes
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: 'login', element: <Login saveLoginData={saveLoginData} /> },
        { path: 'register', element: <Register /> },
        { path: 'forget-password', element: <ForgetPassword /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify-account', element: <VerifyAccount /> },
        { path: 'change-password', element: <ChangePassword /> },
      ]
    },
    {
      path: '/',
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'projects', element: <ProjectLists /> },
        { path: 'projects/new-project', element: <ProjectForm /> },
        { path: 'projects/:projectId', element: <ProjectForm /> },
        { path: 'tasks', element: <TaskLists /> },
        { path: 'tasks/create-task', element: <TaskForm /> },
        { path: 'tasks/:taskId', element: <TaskForm /> },
        { path: 'users', element: <UserLists /> },
      ]
    }
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
