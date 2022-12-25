import { Outlet, Navigate } from 'react-router-dom';
import { getAccessToken } from './../Utils/AuthHelperFn';
import { RoutePath } from './../Data/Constant';
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
    return auth ? <Outlet /> : <Navigate to={RoutePath.home} />;
};

export default ProtectedRoute;
