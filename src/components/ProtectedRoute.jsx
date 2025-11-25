import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                flexDirection: 'column',
                gap: 'var(--space-lg)'
            }}>
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return user ? children : <Navigate to="/login" />;
}
