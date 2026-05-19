import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
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
        <div className={`login-form-container ${onClose ? "full-width" : ""}`}>
            {onClose && (
                <button type="button" onClick={onClose} className="login-close-btn">
                    ✕
                </button>
            )}
            <h2 className="login-title">Welcome back to QuickShow</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    id="email" 
                    className="form-input my-3" 
                    type="email" 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required 
                />
                <input 
                    id="password" 
                    className="form-input mt-1" 
                    type="password" 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required 
                />
                <div className="text-right py-4">
                    <Link to="#" className="forgot-password-link">Forgot Password</Link>
                </div>
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log in'}
                </button>
            </form>
            <p className="signup-text">Don't have an account? <Link to="/signup" className="signup-link">Signup</Link></p>
            <SignInButton
                mode="redirect"
                oauthFlow="oauth_apple"
                forceRedirectUrl="/home"
            >
                <div className="social-login-button apple">
                    <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/appleLogo.png" alt="appleLogo" />
                    Log in with Apple
                </div>
            </SignInButton>
            <SignInButton
                mode="redirect"
                oauthFlow="oauth_google"
                forceRedirectUrl="/home"
            >
                <div className="social-login-button google">
                    <img className="h-4 w-4" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png" alt="googleFavicon" />
                    Log in with Google
                </div>
            </SignInButton>
        </div>
    );
};