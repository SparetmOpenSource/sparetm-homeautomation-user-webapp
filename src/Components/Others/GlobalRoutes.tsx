import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RoutePath } from '../../Data/Constant';
import Home from '../../Pages/Home';
import ProfileConfig from '../../Pages/ProfileConfig';
import ProtectedRoute from '../../Services/ProtectedRoute';
import PublicRoute from '../../Services/PublicRoute';
import LoadingFade from './LoadingAnimation/LoadingFade/LoadingFade';

const GlobalRoutes = () => {
    return (
        <Suspense fallback={<LoadingFade />}>
            <Routes>
                {/************************HOME PAGE*****************************/}
                <Route element={<PublicRoute />}>
                    <Route
                        path={RoutePath.home}
                        element={
                            <Suspense fallback={<LoadingFade />}>
                                <Home />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<ProtectedRoute />}>
                    {/***********************ADD/OPEN PROFILE***************************/}
                    <Route
                        path={RoutePath.profileConfig}
                        element={
                            <Suspense fallback={<LoadingFade />}>
                                <ProfileConfig />
                            </Suspense>
                        }
                    />
                </Route>
                {/************************NOT FOUND**************************/}
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<LoadingFade />}>
                            <h1>NotFound </h1>
                        </Suspense>
                    }
                />
            </Routes>
        </Suspense>
    );
};

export default GlobalRoutes;
