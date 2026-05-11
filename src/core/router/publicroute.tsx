import { Navigate } from 'react-router-dom';
import { RoutePath } from '../../data/Constants';
import { useAppSelector } from '../store/Reduxhooks';

const useAuth = (accessToken: any) => {
    return !!accessToken;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useAppSelector((state) => state.user.token);
    const auth = useAuth(accessToken);
    if (auth) {
        return <Navigate to={RoutePath.ProfileConfig} />;
    }
    return <>{children}</>;
};

export default PublicRoute;
