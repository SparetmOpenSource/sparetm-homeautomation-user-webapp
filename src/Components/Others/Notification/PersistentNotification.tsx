import React, { useEffect, useCallback } from 'react';
import NotificationContent from './NotificationContent';
import { useAppDispatch, useAppSelector } from '../../../Features/ReduxHooks';
import { useBackDropOpen } from '../../../Pages/ThemeProvider';
import { acknowledgeNotification, hideNotification } from '../../../Features/Notification/NotificationSlice';
import { GLOBAL_NOTIFICATION, LandscapeSizeM } from '../../../Data/Constants';
import useLocalStorage from '../../../Hooks/UseLocalStorage';

import { ACKNOWLEDGED_NOTIFICATIONS_KEY } from '../../../Data/Constants';

const PersistentNotification: React.FC = () => {
    const dispatch = useAppDispatch();
    const notification = useAppSelector((state) => state.notification);
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    const { id, message, type, isVisible, timestamp } = notification;
    
    // Use hook for acknowledged notifications
    const [acknowledgedIds, setAcknowledgedIds] = useLocalStorage<string[]>(ACKNOWLEDGED_NOTIFICATIONS_KEY, []);
    
    // Track the last processed timestamp to prevent re-opening on mount/remount
    const lastProcessedTimestamp = React.useRef(timestamp);

    // Check if this notification was already acknowledged and show if needed
    useEffect(() => {
        // Only process if we have an ID and notification is marked as visible
        if (id && isVisible) {
            if (acknowledgedIds.includes(id)) {
                // Already acknowledged, hide it immediately
                dispatch(hideNotification());
                return;
            }
        }
    }, [id, isVisible, timestamp, dispatch, acknowledgedIds]);

    const handleAcknowledge = useCallback(() => {
        if (id) {
            // Update storage via hook
            setAcknowledgedIds((prev) => {
                if (!prev.includes(id)) {
                    return [...prev, id];
                }
                return prev;
            });
        }

        // Dispatch acknowledge action
        dispatch(acknowledgeNotification());
    }, [id, dispatch, setAcknowledgedIds]);

    // Open/close backdrop based on isVisible AND timestamp change
    useEffect(() => {
        // Only open if:
        // 1. We have a valid ID and it's visible
        // 2. The timestamp is NEW (different from what we last processed)
        //    OR it's a completely new ID (though timestamp usually covers this)
        
        if (id && isVisible && timestamp !== lastProcessedTimestamp.current) {
            lastProcessedTimestamp.current = timestamp;
            
            toggleBackDropOpen(
                GLOBAL_NOTIFICATION,
                <NotificationContent
                    message={message}
                    type={type}
                    onAcknowledge={handleAcknowledge}
                />,
                LandscapeSizeM
            );
        } else if (!isVisible) {
            toggleBackDropClose(GLOBAL_NOTIFICATION);
        }
        // Note: We intentionally DO NOT open on mount (when timestamp === lastProcessedTimestamp.current)
        // This solves the "showing on page change" issue.
        
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

export default PersistentNotification;
