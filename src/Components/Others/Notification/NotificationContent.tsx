import React from 'react';
import './NotificationContent.css';
import { NotificationType } from '../../../Features/Notification/NotificationSlice';

interface NotificationContentProps {
    message: string;
    type: NotificationType;
    onAcknowledge: () => void;
}

const NotificationContent: React.FC<NotificationContentProps> = ({
    message,
    type,
    onAcknowledge,
}) => {
    return (
        <div className={`notification-content notification-${type.toLowerCase()}`}>
            <div className="notification-content-header">
                <h3>{type}</h3>
            </div>
            <div className="notification-content-body">
                <p>{message}</p>
            </div>
            <div className="notification-content-footer">
                <button
                    className="notification-content-acknowledge-btn"
                    onClick={onAcknowledge}
                >
                    Acknowledge
                </button>
            </div>
        </div>
    );
};

export default NotificationContent;
