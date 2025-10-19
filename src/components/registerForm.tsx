import { useState } from "react";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Link } from "react-router";

import { apiRegister } from "@/api/auth";

export function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [passwordDoNotMatch, setPasswordDoNotMatch] = useState<string | null>(null);
    const [username, setUsername] = useState("username");
    const [email, setEmail] = useState("email@example.com");
    const [password, setPassword] = useState("password");
    const [confirmPassword, setConfirmPassword] = useState("password");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setPasswordDoNotMatch(null);

        setLoading(true);


        if (password !== confirmPassword) {
            setPasswordDoNotMatch("Passwords do not match");
            setLoading(false);
            return;
        }

        const res = await apiRegister(username, email, password);
        if (res.ok) {
            // Registration successful, redirect to login page
            window.location.href = "/login";
        } else {
            setError(res.error || "Registration failed");
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="text-center mb-6 text-red-500">{error}</p>}
            <div className="mb-4">
                <Label className="mb-2" htmlFor="username">Username</Label>
                <Input className="p-4"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your username"
                    required />
            </div>

            <div className="mb-4">
                <Label className="mb-2" htmlFor="email">Email</Label>
                <Input className="p-4"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    required />
            </div>

            <div className="mb-4">
                <Label className="mb-2" htmlFor="password">Password</Label>
                <Input className="p-4"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    required />
                <p className="text-sm text-left text-red-500">{passwordDoNotMatch}</p>

            </div>

            <div className="mb-4">
                <Label className="mb-2" htmlFor="confirm">Confirm Password</Label>
                <Input className="p-4"
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="********"
                    required />
                <p className="text-sm text-left text-red-500">{passwordDoNotMatch}</p>

            </div>

            <Button className="mt-6 w-full" type="submit" disabled={loading}>
                {loading ? (<><Spinner />Loading...</>) : "Register"}
            </Button>
            <p className="text-center mt-2">Have an account? <Link className="text-blue-500" to="/login">Login</Link></p>
        </form>
    )
}
