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
    },
});

export const {
    addDeviceData,
    updateDeviceStatus,
    removeDeviceData,
    addCurrentDevice,
    removeCurrentDevice,
    updateDevice,
} = deviceSlice.actions;

export default deviceSlice.reducer;
