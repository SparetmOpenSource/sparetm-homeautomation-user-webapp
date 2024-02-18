import { Outlet, Navigate } from 'react-router-dom';
import { RoutePath } from '../Data/Constants';
import { getAccessToken } from '../Utils/HelperFn';

const useAuth = () => {
    const accessToken = getAccessToken();
    if (accessToken) {
        return true;
    } else {
        return false;
    }
};

const ProtectedRoute = () => {
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to={RoutePath.Home} />;
};

export default ProtectedRoute;
