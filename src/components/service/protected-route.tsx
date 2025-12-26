import { Navigate } from 'react-router';
import { useAuth } from '@/context/auth-context';
import { Loader } from 'lucide-react';

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();

    if (loading)
        return (
            <div className='absolute top-1/2 left-1/2 -translate-1/2 p-6'>
                <Loader className='animate-spin' />
            </div>
        );

    if (!user) return <Navigate to='/login' replace />;

    return children;
}
