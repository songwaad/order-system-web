import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <nav className="fixed left-1/2 px-4 rounded-2xl -translate-x-1/2 top-4 w-5xl flex justify-between p-2 bg-gray-200">
      <div className="flex items-center">
        <p className="font-bold text-lg me-6">KornKK</p>

        <NavLink to="/" end>
          {({ isActive }) => (
            <Button className="cursor-pointer" variant={isActive ? "outline" : "ghost"}>Home</Button>
          )}
        </NavLink>

        <NavLink to="/movies">
          {({ isActive }) => (
            <Button className="cursor-pointer" variant={isActive ? "outline" : "ghost"}>Movies</Button>
          )}
        </NavLink>

        <NavLink to="/about">
          {({ isActive }) => (
            <Button className="cursor-pointer" variant={isActive ? "outline" : "ghost"}>About</Button>
          )}
        </NavLink>
      </div>

      <div className="flex items-center space-x-2">
        {user ? (
          <>
            <p className="text-sm">Hello, {user.username}</p>
            <Button className="cursor-pointer" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <NavLink to="/login">
            <Button className="cursor-pointer" variant="default">Login</Button>
          </NavLink>
        )}
      </div>
    </nav>
  );
}
