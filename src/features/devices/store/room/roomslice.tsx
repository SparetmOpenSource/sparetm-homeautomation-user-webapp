import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initial state
const initialState = {
    firstRoom: '',
};

// actions
const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        addFirstRoom: (state, action: PayloadAction<any>) => {
            state.firstRoom = action.payload;
        },
        removeFirstRoom: (state) => {
            state.firstRoom = '';
        },
    },
});

export const { addFirstRoom, removeFirstRoom } = roomSlice.actions;
export default roomSlice.reducer;
