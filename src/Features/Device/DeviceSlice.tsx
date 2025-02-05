import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initial state
const initialState = {
    mqttUpdate: {},
    mqttNotification: {},
    deviceData: {},
    currentDevice: {},
};

// actions
const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        addMqttUpdate: (state, action: PayloadAction<any>) => {
            state.mqttUpdate = action.payload;
        },
        removeMqttUpdate: (state) => {
            state.mqttUpdate = {};
        },
        addMqttNotification: (state, action: PayloadAction<any>) => {
            state.mqttNotification = action.payload;
        },
        removeMqttNotification: (state) => {
            state.mqttNotification = {};
        },
        addDeviceData: (state, action: PayloadAction<any>) => {
            state.deviceData = action.payload;
        },
        removeDeviceData: (state) => {
            state.deviceData = {};
        },
        addCurrentDevice: (state, action: PayloadAction<any>) => {
            state.currentDevice = action.payload;
        },
        removeCurrentDevice: (state) => {
            state.currentDevice = {};
        },
    },
});

export const {
    addMqttUpdate,
    removeMqttUpdate,
    addMqttNotification,
    removeMqttNotification,
    addDeviceData,
    removeDeviceData,
    addCurrentDevice,
    removeCurrentDevice,
} = deviceSlice.actions;
export default deviceSlice.reducer;
