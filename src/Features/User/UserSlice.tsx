import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ADMIN, PROFILE, PROFILEID, TOKEN } from '../../Data/Constants';

// initial state
const initialState = {
    admin: localStorage.getItem(ADMIN),
    profile: localStorage.getItem(PROFILE),
    token: localStorage.getItem(TOKEN),
    profileId: localStorage.getItem(PROFILEID),
    profileData: {},
};

// actions
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addAdmin: (state, action: PayloadAction<any>) => {
            localStorage.setItem(ADMIN, action.payload);
            state.admin = action.payload;
        },
        removeAdmin: (state) => {
            localStorage.removeItem(ADMIN);
            state.admin = '';
        },
        addProfile: (state, action: PayloadAction<any>) => {
            localStorage.setItem(PROFILE, action.payload);
            state.profile = action.payload;
        },
        removeProfile: (state) => {
            localStorage.removeItem(PROFILE);
            state.profile = '';
        },
        addToken: (state, action: PayloadAction<any>) => {
            localStorage.setItem(TOKEN, action.payload);
            state.profile = action.payload;
        },
        removeToken: (state) => {
            localStorage.removeItem(TOKEN);
            state.profile = '';
        },
        addProfileId: (state, action: PayloadAction<any>) => {
            localStorage.setItem(PROFILEID, action.payload);
            state.profileId = action.payload;
        },
        removeProfileId: (state) => {
            localStorage.removeItem(PROFILEID);
            state.profileId = '';
        },
        resetApp: (state) => {
            localStorage.removeItem(ADMIN);
            localStorage.removeItem(PROFILE);
            localStorage.removeItem(TOKEN);
            localStorage.removeItem(PROFILEID);
            state.admin = '';
            state.profile = '';
            state.profileId = '';
        },
        resetProfile: (state) => {
            localStorage.removeItem(PROFILE);
            localStorage.removeItem(PROFILEID);
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
