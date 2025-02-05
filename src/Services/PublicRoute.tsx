import { Navigate } from 'react-router-dom';
import { RoutePath } from '../Data/Constants';

const useAuth = (accessToken: any) => {
    return !!accessToken; 
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const accessToken = localStorage.getItem('token');
    const auth = useAuth(accessToken);
    if (auth) {
        return <Navigate to={RoutePath.ProfileConfig} />;
    }
    return <>{children}</>;
};

export default PublicRoute;
