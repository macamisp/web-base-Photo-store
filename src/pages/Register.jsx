import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, User, Image, AlertCircle, CheckCircle } from 'lucide-react';
import './Auth.css';

export default function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        // Validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            await signUp(fullName, email, password);
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-background">
                <div className="auth-blob blob-1"></div>
                <div className="auth-blob blob-2"></div>
                <div className="auth-blob blob-3"></div>
            </div>

            <div className="auth-content animate-scaleIn">
                <div className="auth-header">
                    <div className="auth-logo">
                        <Image size={48} strokeWidth={1.5} />
                    </div>
                    <h1>Create Account</h1>
                    <p>Join us and start storing your precious memories</p>
                </div>

                {error && (
                    <div className="error-banner animate-slideIn">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="success-banner animate-slideIn">
                        <CheckCircle size={20} />
                        <span>Account created successfully! Redirecting...</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label htmlFor="fullName" className="input-label">
                            <User size={16} />
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="input"
                            placeholder="John Doe"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email" className="input-label">
                            <Mail size={16} />
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password" className="input-label">
                            <Lock size={16} />
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword" className="input-label">
                            <Lock size={16} />
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={loading || success}
                        style={{ width: '100%' }}
                    >
                        {loading ? (
                            <>
                                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                                Creating account...
                            </>
                        ) : success ? (
                            <>
                                <CheckCircle size={20} />
                                Account Created!
                            </>
                        ) : (
                            <>
                                <UserPlus size={20} />
                                Create Account
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
