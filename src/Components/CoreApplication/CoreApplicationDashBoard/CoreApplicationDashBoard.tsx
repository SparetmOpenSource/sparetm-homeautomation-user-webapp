//import React, { useState } from 'react';
import { useState } from 'react';
import './CoreApplicationDashBoard.css';
import CalenderFrame from '../../Others/Calendar/CalenderFrame';
import StatusPanel from './Features/StatusPanel/StatusPanel';
import FeatureWrapper from './Features/FeatureWrapper/FeatureWrapper';

const CoreApplicationDashBoard = () => {
    const [dateValue, setDateValue]: any = useState();
    return (
        <div className="coreApplicationDashBoard">
            {/* ****************************Dashboard Content*************************** */}

            <section className="coreApplicationDashBoard_content">
                <div>
                    <StatusPanel />
                </div>
                <div>
                    <FeatureWrapper dateValue={dateValue} />
                </div>
            </section>

            {/* ****************************Dashboard Notification*************************** */}

            <section className="coreApplicationDashBoard_notification">
                <div className="coreApplicationDashBoard_notification_center">
                    {dateValue}
                </div>
                <div className="coreApplicationDashBoard_notification_center">
                    by
                </div>
                <div className="coreApplicationDashBoard_notification_center">
                    sy
                </div>
                <div>
                    <CalenderFrame setNewDate={setDateValue} />
                </div>
            </section>
        </div>
    );
};

export default CoreApplicationDashBoard;
