import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ADMIN_GLOBAL, PROFILE_GLOBAL, PROFILEID_GLOBAL, TOKEN_GLOBAL } from '../../Data/Constants';

// Helper to safely get from localStorage and convert null to empty string
const getStorageValue = (key: string): string => {
    const value = localStorage.getItem(key);
    if (value === null || value === 'null') return '';
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
};

// State interface
interface UserState {
    admin: string;
    profile: string;
    token: string;
    profileId: string;
    profileData: any;
}

// initial state
const initialState: UserState = {
    admin: getStorageValue(ADMIN_GLOBAL),
    profile: getStorageValue(PROFILE_GLOBAL),
    token: getStorageValue(TOKEN_GLOBAL),
    profileId: getStorageValue(PROFILEID_GLOBAL),
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
