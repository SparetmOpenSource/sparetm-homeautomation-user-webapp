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
const PublicRoute = () => {
    const auth = useAuth();
    return auth ? <Navigate to={RoutePath.ProfileConfig} /> : <Outlet />;
};

export default PublicRoute;
