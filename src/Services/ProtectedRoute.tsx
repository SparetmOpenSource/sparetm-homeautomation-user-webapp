import { Navigate } from 'react-router-dom';
import { RoutePath } from '../Data/Constants';

const useAuth = (accessToken: any) => {
    return !!accessToken;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const accessToken = localStorage.getItem('token');
    const auth = useAuth(accessToken);
    if (!auth) {
        return <Navigate to={RoutePath.Home} />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
