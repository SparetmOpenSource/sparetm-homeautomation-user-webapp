import { Navigate } from 'react-router-dom';
import { RoutePath, TOKEN } from '../Data/Constants';
import useLocalStorage from '../Hooks/UseLocalStorage';

const useAuth = (accessToken: any) => {
    return !!accessToken;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [accessToken] = useLocalStorage(`${TOKEN}_global`, '');
    const auth = useAuth(accessToken);
    if (!auth) {
        return <Navigate to={RoutePath.Home} />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
