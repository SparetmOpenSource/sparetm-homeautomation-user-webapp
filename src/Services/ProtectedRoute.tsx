import { Outlet, Navigate } from 'react-router-dom';
import { RoutePath } from '../Data/Constants';

const useAuth = (accessToken: any) => {
    if (accessToken) {
        return true;
    } else {
        return false;
    }
};

const ProtectedRoute = () => {
    const accessToken = localStorage.getItem('token');
    const auth = useAuth(accessToken);
    return auth ? <Outlet /> : <Navigate to={RoutePath.Home} />;
};

export default ProtectedRoute;
