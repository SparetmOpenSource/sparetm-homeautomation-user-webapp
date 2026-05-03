import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// State interface
interface UserState {
    admin: string;
    profile: string;
    token: string;
    profileId: string;
    profileData: any;
}

// initial state (redux-persist handles hydration automatically)
const initialState: UserState = {
    admin: '',
    profile: '',
    token: '',
    profileId: '',
    profileData: {},
};

// actions
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addAdmin: (state, action: PayloadAction<string>) => {
            state.admin = action.payload;
        },
        removeAdmin: (state) => {
            state.admin = '';
        },
        addProfile: (state, action: PayloadAction<string>) => {
            state.profile = action.payload;
        },
        removeProfile: (state) => {
            state.profile = '';
        },
        addToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        removeToken: (state) => {
            state.token = '';
        },
        addProfileId: (state, action: PayloadAction<string>) => {
            state.profileId = action.payload;
        },
        removeProfileId: (state) => {
            state.profileId = '';
        },
        resetApp: (state) => {
            state.admin = '';
            state.profile = '';
            state.token = '';
            state.profileId = '';
        },
        resetProfile: (state) => {
            state.profile = '';
            state.profileId = '';
        },
        addProfileData: (state, action: PayloadAction<any>) => {
            state.profileData = action.payload;
        },
        removeProfileData: (state) => {
            state.profileData = '';
        },
    },
});

export const {
    addAdmin,
    removeAdmin,
    addProfile,
    removeProfile,
    addToken,
    removeToken,
    addProfileId,
    removeProfileId,
    resetApp,
    resetProfile,
    addProfileData,
    removeProfileData,
} = userSlice.actions;
export default userSlice.reducer;
