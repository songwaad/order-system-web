import './App.css'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import HomePage from './pages/home';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import { AuthProvider } from './context/AuthContext';

import { ThemeProvider } from './components/theme-provider';

import { Toaster } from './components/ui/sonner';
import { ModeToggle } from './components/mode-toggle';

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
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
        <ModeToggle />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
