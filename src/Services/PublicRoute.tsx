import { Navigate } from 'react-router-dom';
import { RoutePath, TOKEN } from '../Data/Constants';
import useLocalStorage from '../Hooks/UseLocalStorage';

const useAuth = (accessToken: any) => {
    return !!accessToken; 
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const [accessToken] = useLocalStorage(`${TOKEN}_global`, '');
    const auth = useAuth(accessToken);
    if (auth) {
        return <Navigate to={RoutePath.ProfileConfig} />;
    }
    return <>{children}</>;
};

export default PublicRoute;
