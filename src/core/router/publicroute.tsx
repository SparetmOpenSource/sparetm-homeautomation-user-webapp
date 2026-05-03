import { Navigate } from 'react-router-dom';
import { RoutePath } from '../../data/constants';
import { useAppSelector } from '../store/reduxhooks';

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
