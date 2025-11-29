import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RoomCounts {
    total: number;
    on: number;
    off: number;
}

interface Device {
    deviceId: string;
    roomType: string;
    status: boolean;
    [key: string]: any; // Allow other properties
}

interface DeviceState {
    deviceData: {
        body: Device[];
    };
    currentDevice: Device | null;
    roomCounts: Record<string, RoomCounts>;
}

const initialState: DeviceState = {
    deviceData: { body: [] },
    currentDevice: null,
    roomCounts: {},
};

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        addDeviceData: (state, action: PayloadAction<Device[]>) => {
            state.deviceData = {
                body: action.payload.map((el) => ({ ...el })),
            };

            // ✅ build counts per roomType
            const counts: Record<string, RoomCounts> = {};
            action.payload.forEach((el: any) => {
                const room = el.roomType?.toLowerCase();
                if (!counts[room]) {
                    counts[room] = { total: 0, on: 0, off: 0 };
                }
                counts[room].total += 1;
                if (el.status) counts[room].on += 1;
                else counts[room].off += 1;
            });

            state.roomCounts = counts;
        },

        updateDeviceStatus: (
            state,
            action: PayloadAction<{ id: string; status: boolean }>,
        ) => {
            const device = state.deviceData.body.find(
                (d: any) => d.deviceId === action.payload.id,
            );

            if (device) {
                const prevStatus = device.status;
                device.status = action.payload.status;

                const room = device.roomType?.toLowerCase();
                if (!state.roomCounts[room]) {
                    state.roomCounts[room] = { total: 0, on: 0, off: 0 };
                }

                // ✅ adjust counts for that room only
                if (prevStatus !== action.payload.status) {
                    if (action.payload.status) {
                        state.roomCounts[room].on += 1;
                        state.roomCounts[room].off -= 1;
                    } else {
                        state.roomCounts[room].on -= 1;
                        state.roomCounts[room].off += 1;
                    }
                }
            }
        },

        removeDeviceData: (state) => {
            state.deviceData = { body: [] };
            state.roomCounts = {};
        },

        addCurrentDevice: (state, action: PayloadAction<Device>) => {
            state.currentDevice = action.payload;
        },

        removeCurrentDevice: (state) => {
            state.currentDevice = null;
        },

        // New action for WebSocket updates - updates any device property
        updateDevice: (
            state,
            action: PayloadAction<{ deviceId: string; updates: Partial<Device> }>,
        ) => {
            const device = state.deviceData.body.find(
                (d: any) => d.deviceId === action.payload.deviceId,
            );

            if (device) {
                const prevStatus = device.status;
                
                // Apply all updates
                Object.assign(device, action.payload.updates);

                // Recalculate room counts if status changed
                if (prevStatus !== device.status) {
                    const room = device.roomType?.toLowerCase();
                    if (!state.roomCounts[room]) {
                        state.roomCounts[room] = { total: 0, on: 0, off: 0 };
                    }

                    if (device.status) {
                        state.roomCounts[room].on += 1;
                        state.roomCounts[room].off -= 1;
                    } else {
                        state.roomCounts[room].on -= 1;
                        state.roomCounts[room].off += 1;
                    }
                }
            }
        },

        addDevice: (state, action: PayloadAction<Device>) => {
            const exists = state.deviceData.body.some(d => d.deviceId === action.payload.deviceId);
            if (!exists) {
                state.deviceData.body.push(action.payload);
                
                const room = action.payload.roomType?.toLowerCase();
                if (room) {
                    if (!state.roomCounts[room]) {
                        state.roomCounts[room] = { total: 0, on: 0, off: 0 };
                    }
                    state.roomCounts[room].total += 1;
                    if (action.payload.status) {
                        state.roomCounts[room].on += 1;
                    } else {
                        state.roomCounts[room].off += 1;
                    }
                }
            }
        },

        removeDevice: (state, action: PayloadAction<string>) => {
            const index = state.deviceData.body.findIndex(d => d.deviceId === action.payload);
            if (index !== -1) {
                const device = state.deviceData.body[index];
                const room = device.roomType?.toLowerCase();
                
                if (room && state.roomCounts[room]) {
                    state.roomCounts[room].total -= 1;
                    if (device.status) {
                        state.roomCounts[room].on -= 1;
                    } else {
                        state.roomCounts[room].off -= 1;
                    }
                }
                
                state.deviceData.body.splice(index, 1);
            }
        },

        updateAllDevices: (state, action: PayloadAction<{ status: boolean }>) => {
            const newStatus = action.payload.status;
            
            // Update all devices
            state.deviceData.body.forEach(device => {
                device.status = newStatus;
            });

            // Update all room counts efficiently
            Object.keys(state.roomCounts).forEach(room => {
                const count = state.roomCounts[room];
                if (newStatus) {
                    count.on = count.total;
                    count.off = 0;
                } else {
                    count.on = 0;
                    count.off = count.total;
                }
            });
        },

        updateDeviceDataStore: (
            state,
            action: PayloadAction<{ deviceId: string; data: Record<string, any> }>
        ) => {
            const device = state.deviceData.body.find(
                (d: any) => d.deviceId === action.payload.deviceId
            );
            if (device) {
                // Ensure deviceDataStore exists
                if (!device.deviceDataStore) {
                    device.deviceDataStore = {};
                }
                // Merge new data
                Object.assign(device.deviceDataStore, action.payload.data);
            }
        },

        deleteDeviceDataStore: (
            state,
            action: PayloadAction<{ deviceId: string; keys: string[] }>
        ) => {
            const device = state.deviceData.body.find(
                (d: any) => d.deviceId === action.payload.deviceId
            );
            if (device && device.deviceDataStore) {
                action.payload.keys.forEach(key => {
                    delete device.deviceDataStore[key];
                });
            }
        },
    },
});

export const {
    addDeviceData,
    updateDeviceStatus,
    removeDeviceData,
    addCurrentDevice,
    removeCurrentDevice,
    updateDevice,
    addDevice,
    removeDevice,
    updateAllDevices,
    updateDeviceDataStore,
    deleteDeviceDataStore,
} = deviceSlice.actions;

export default deviceSlice.reducer;
