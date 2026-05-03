import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NotificationType = 'INFO' | 'WARNING' | 'ERROR';

interface NotificationState {
    id: string | null;
    message: string;
    type: NotificationType;
    isVisible: boolean;
    timestamp: number; // Force re-render on same notification
}

const initialState: NotificationState = {
    id: null,
    message: '',
    type: 'INFO',
    isVisible: false,
    timestamp: 0,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (
            state,
            action: PayloadAction<{
                id: string;
                message: string;
                type: NotificationType;
            }>
        ) => {
            state.id = action.payload.id;
            state.message = action.payload.message;
            state.type = action.payload.type;
            state.isVisible = true;
            state.timestamp = Date.now(); // Force state change
        },
        showNotification: (state) => {
            state.isVisible = true;
        },
        hideNotification: (state) => {
            state.isVisible = false;
        },
        acknowledgeNotification: (state) => {
            state.id = null;
            state.message = '';
            state.isVisible = false;
        },
    },
});

export const {
    setNotification,
    showNotification,
    hideNotification,
    acknowledgeNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
