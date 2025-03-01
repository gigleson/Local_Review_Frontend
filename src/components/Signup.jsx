import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Signup = () => {
    const [input, setInput] = useState({ username: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
                setInput({ username: "", email: "", password: "" });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-red-100">
            <div className="bg-white shadow-2xl rounded-xl p-8 max-w-sm w-full border-t-4 border-red-600">
                {/* LOGO */}
                <div className="flex flex-col items-center mb-6">
                    <img src="/logo.png" alt="Logo" className="w-20 h-20" />
                    <h1 className="text-2xl font-bold text-red-700 mt-2">Create an Account</h1>
                    <p className="text-gray-500 text-sm">Signup to start your journey</p>
                </div>

                {/* SIGNUP FORM */}
                <form onSubmit={signupHandler} className="flex flex-col gap-5">
                    <div>
                        <label className="font-medium text-gray-700">Username</label>
                        <Input
                            type="text"
                            name="username"
                            value={input.username}
                            onChange={changeEventHandler}
                            className="focus:ring-red-500 border-gray-300 mt-2"
                        />
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Email</label>
                        <Input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            className="focus:ring-red-500 border-gray-300 mt-2"
                        />
                    </div>
                    <div>
                        <label className="font-medium text-gray-700">Password</label>
                        <Input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            className="focus:ring-red-500 border-gray-300 mt-2"
                        />
                    </div>

                    {/* Signup Button */}
                    {loading ? (
                        <Button disabled className="flex justify-center items-center gap-2 bg-red-500 text-white">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Signing up...
                        </Button>
                    ) : (
                        <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                            Signup
                        </Button>
                    )}

                    {/* Login Link */}
                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-red-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup;
