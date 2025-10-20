import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router";


import { Input } from "@/components/ui/input"
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Spinner } from "./ui/spinner";

import { toast } from "sonner";


export function LoginForm() {
    const { login } = useAuth();
    const [identity, setIdentity] = useState("example1@email.com");
    const [password, setPassword] = useState("password");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(identity, password);
        if (result.success) {
            // Login successful, redirect or update UI as needed
            window.location.href = "/";
        } else {
            toast.error(result.error || "Login failed");
        }
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">


            <div className="mb-4">
                <Label className="mb-2" htmlFor="email">Email</Label>
                <Input className="p-4"
                    id="email"
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    type="email"
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
            </div>

            <Button className="cursor-pointer mt-6 w-full" type="submit" disabled={loading}>
                {loading ? (<><Spinner />Loading...</>) : "Login"}
            </Button>
            <p className="text-center mt-2">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>

        </form>
    )
}
