import './App.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { AuthProvider } from './context/AuthContext';

import { Toaster } from './components/ui/sonner';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }
]);

const root = document.getElementById("root");
if (!root) throw new Error("Failed to find the root element");

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  )
}

export default App
