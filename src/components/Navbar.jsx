import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Image, LogOut, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container container">
                <div className="navbar-brand">
                    <div className="navbar-logo">
                        <Image size={28} strokeWidth={2} />
                    </div>
                    <span className="navbar-title">PhotoStore</span>
                </div>

                <div className="navbar-menu">
                    <div className="navbar-user">
                        <div className="user-avatar">
                            <User size={18} />
                        </div>
                        <div className="user-info">
                            <span className="user-name">
                                {user?.fullName || 'User'}
                            </span>
                            <span className="user-email">{user?.email}</span>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className="btn btn-ghost btn-sm"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </div>
        </nav>
    );
}
