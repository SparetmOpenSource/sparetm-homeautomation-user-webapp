import { lazy, Suspense } from 'react';
import LoadingFade from '../../Others/LoadingAnimation/LoadingFade/LoadingFade';
import './CoreAppDashBoard.css';

const StatusPanel = lazy(
    () =>
        import('./../CoreAppDashboardStatusPanel/CoreAppDashboardStatusPanel'),
);

const CoreAppDashBoard = () => {
    return (
        <div className="coreAppDashBoard">
            {/* ****************************Dashboard Content*************************** */}

            <section className="coreAppDashBoard_content">
                <div>
                    <Suspense fallback={<LoadingFade />}>
                        <StatusPanel />
                    </Suspense>
                </div>
                <div>dashboard feature</div>
            </section>

            {/* ****************************Dashboard Notification*************************** */}

            <section className="coreAppDashBoard_notification">
                <div>hi</div>
                <div>by</div>
                <div>sy</div>
                <div>calendar</div>
            </section>
        </div>
    );
};

export default CoreAppDashBoard;
