import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BlinkState {
    trigger: boolean;
    color: string;
}

const initialState: BlinkState = {
    trigger: false,
    color: 'green', // default global blink color
};

const blinkSlice = createSlice({
    name: 'blink',
    initialState,
    reducers: {
        triggerBlink: (state) => {
            state.trigger = true;
        },
        resetBlink: (state) => {
            state.trigger = false;
        },
        setBlinkColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        },
    },
});

export const { triggerBlink, resetBlink, setBlinkColor } = blinkSlice.actions;
export default blinkSlice.reducer;
