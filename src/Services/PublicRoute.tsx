import { Outlet, Navigate } from 'react-router-dom';
import { RoutePath } from '../Data/Constants';

const useAuth = (accessToken: any) => {
    if (accessToken) {
        return true;
    } else {
        return false;
    }
};
const PublicRoute = () => {
    const accessToken = localStorage.getItem('token');
    const auth = useAuth(accessToken);
    return auth ? <Navigate to={RoutePath.ProfileConfig} /> : <Outlet />;
};

export default PublicRoute;
