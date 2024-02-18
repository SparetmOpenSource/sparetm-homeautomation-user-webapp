//import React, { useState } from 'react';
import "./CoreApplicationDashBoard.css";

const CoreApplicationDashBoard = () => {
    //const [dateValue, setDateValue]: any = useState();
    return (
        <div className="coreApplicationDashBoard">
            {/* ****************************Dashboard Content*************************** */}

            <section className="coreApplicationDashBoard_content">
                <div>
                    {/* <CoreAppDashboardStatusPanel /> */}
                </div>
                <div>
                    {/* <CoreAppDashboardFeatures dateValue={dateValue} /> */}
                </div>
            </section>

            {/* ****************************Dashboard Notification*************************** */}

            <section className="coreApplicationDashBoard_notification">
                <div className="coreApplicationDashBoard_notification_center">hi</div>
                <div className="coreApplicationDashBoard_notification_center">by</div>
                <div className="coreApplicationDashBoard_notification_center">sy</div>
                <div>
                    {/* <CalenderFrame setNewDate={setDateValue} /> */}
                </div>
            </section>
        </div>
  )
}

export default CoreApplicationDashBoard