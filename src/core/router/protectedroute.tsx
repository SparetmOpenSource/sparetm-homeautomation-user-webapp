import { Navigate } from 'react-router-dom';
import { RoutePath } from '../../data/constants';
import { useAppSelector } from '../store/reduxhooks';

const useAuth = (accessToken: any) => {
    return !!accessToken;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useAppSelector((state) => state.user.token);
    const auth = useAuth(accessToken);
    if (!auth) {
        return <Navigate to={RoutePath.Home} />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
