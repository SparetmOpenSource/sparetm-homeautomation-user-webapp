import React, { useEffect, useCallback } from 'react';
import NotificationContent from './NotificationContent';
import { useAppDispatch, useAppSelector } from '../../../Features/ReduxHooks';
import { useBackDropOpen } from '../../../Pages/ThemeProvider';
import { acknowledgeNotification, hideNotification } from '../../../Features/Notification/NotificationSlice';
import { GLOBAL_NOTIFICATION, LandscapeSizeM } from '../../../Data/Constants';

const ACKNOWLEDGED_NOTIFICATIONS_KEY = 'acknowledged_notifications';

const PersistentNotification: React.FC = () => {
    const dispatch = useAppDispatch();
    const notification = useAppSelector((state) => state.notification);
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    const { id, message, type, isVisible, timestamp } = notification;

    // Check if this notification was already acknowledged and show if needed
    useEffect(() => {
        // Only process if we have an ID and notification is marked as visible
        if (id && isVisible) {
            const acknowledgedIds = getAcknowledgedIds();
            
            if (acknowledgedIds.includes(id)) {
                // Already acknowledged, hide it immediately
                dispatch(hideNotification());
                return;
            }
        }
    }, [id, isVisible, timestamp, dispatch]);

    const handleAcknowledge = useCallback(() => {
        if (id) {
            // Save to localStorage
            saveAcknowledgedId(id);
        }

        // Dispatch acknowledge action
        dispatch(acknowledgeNotification());
    }, [id, dispatch]);

    // Open/close backdrop based on isVisible
    useEffect(() => {
        if (id && isVisible) {
            toggleBackDropOpen(
                GLOBAL_NOTIFICATION,
                <NotificationContent
                    message={message}
                    type={type}
                    onAcknowledge={handleAcknowledge}
                />,
                LandscapeSizeM
            );
        } else {
            toggleBackDropClose(GLOBAL_NOTIFICATION);
        }
    }, [id, isVisible, timestamp, message, type, handleAcknowledge, toggleBackDropOpen, toggleBackDropClose]);

    // Listen for backdrop close button clicks to sync state
    useEffect(() => {
        if (!id || !isVisible) return;

        const handleGlobalClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if click is on a close button
            if (target.closest('[aria-label="close"]') || 
                target.closest('.window-drop-close-btn') ||
                target.closest('.close-button')) {
                
                // Check if it's our notification's backdrop (or just assume it is if we are visible)
                // We add a small delay to allow the backdrop to close first
                setTimeout(() => {
                    dispatch(hideNotification());
                }, 100);
            }
        };

        document.addEventListener('click', handleGlobalClick, true);
        return () => document.removeEventListener('click', handleGlobalClick, true);
    }, [id, isVisible, dispatch]);

    return null; // Component doesn't render anything directly
};

// Helper functions for localStorage
const getAcknowledgedIds = (): string[] => {
    try {
        const stored = localStorage.getItem(ACKNOWLEDGED_NOTIFICATIONS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading acknowledged notifications:', error);
        return [];
    }
};

const saveAcknowledgedId = (id: string) => {
    try {
        const acknowledgedIds = getAcknowledgedIds();
        if (!acknowledgedIds.includes(id)) {
            acknowledgedIds.push(id);
            localStorage.setItem(
                ACKNOWLEDGED_NOTIFICATIONS_KEY,
                JSON.stringify(acknowledgedIds)
            );
        }
    } catch (error) {
        console.error('Error saving acknowledged notification:', error);
    }
};

export default PersistentNotification;
