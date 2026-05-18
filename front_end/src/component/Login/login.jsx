import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignInButton } from '@clerk/react';
import { login } from '../../redux/apiCalls';

export default function Login({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await login(dispatch, { email, password });
            if (onClose) onClose();
            navigate('/home');
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    return (
        <div className={onClose ? "w-full" : "bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"}>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Welcome back</h2>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    id="email" 
                    className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-800 placeholder-gray-400" 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required 
                />
                <input 
                    id="password" 
                    className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-gray-800 placeholder-gray-400" 
                    type="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required 
                />
                <div className="text-right py-4">
                    <Link to="#" className="text-blue-600 underline text-xs sm:text-sm hover:text-blue-700">Forgot Password</Link>
                </div>
                <button type="submit" className="w-full mb-3 bg-indigo-500 py-2.5 rounded-full text-white hover:bg-indigo-600 disabled:opacity-50 transition-colors font-medium" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log in'}
                </button>
            </form>
            <p className="text-center mt-4 text-xs sm:text-sm">Don't have an account? <Link to="/signup" className="text-blue-500 underline hover:text-blue-700">Signup</Link></p>
            <SignInButton
                mode="redirect"
                oauthFlow="oauth_apple"
                forceRedirectUrl="/home"
            >
                <div className="w-full flex items-center gap-2 justify-center mt-5 bg-black py-2.5 rounded-full text-white hover:bg-gray-800 transition-colors cursor-pointer">
                    <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="appleLogo" />
                    Log in with Apple
                </div>
            </SignInButton>
            <SignInButton
                mode="redirect"
                oauthFlow="oauth_google"
                forceRedirectUrl="/home"
            >
                <div className="w-full flex items-center gap-2 justify-center my-3 bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800 hover:bg-gray-50 transition-colors cursor-pointer">
                    <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                    Log in with Google
                </div>
            </SignInButton>
        </div>
    );
};