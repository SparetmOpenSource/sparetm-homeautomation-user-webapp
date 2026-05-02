import React from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getNotificationConfig } from './NotificationConfig';
import { playNotificationSound } from './AudioService';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import { NETWORKERRORKEY, spotifyNonPremiumWarning, spotifyNoPlayableDeviceWarning, spotifyUserNotRegisteredWarning } from '../Data/Constants';

const toastProperty: any = (color: any) => {
    const { position } = getNotificationConfig();
    const cleanPosition = position.replace(/"/g, '');
    return {
        position: cleanPosition,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: color,
        transition: Bounce,
        zIndex: 20000,
    };
};

export const displayToastify: any = (message: any, color: any, status: any) => {
    playNotificationSound();
    if (status === TOASTIFYSTATE.INFO) {
        toast.info(message, toastProperty(color));
    } else if (status === TOASTIFYSTATE.SUCCESS) {
        toast.success(message, toastProperty(color));
    } else if (status === TOASTIFYSTATE.WARN) {
        toast.warn(message, toastProperty(color));
    } else {
        toast.error(message, toastProperty(color));
    }
};

export const ToastifyContainer = () => (
    <ToastContainer style={{ zIndex: 20000 }} />
);

export const catchError = (error: any, darkTheme: any) => {
    const nonPremiumErrorsForSpotify = ['Forbidden.', 'Player command failed: Premium required'];
    const noPlayableDeviceErrorsForSpotify = ['Device not found', 'Id not found'];
    const userNotRegisteredErrorsForSpotify = ['Access forbidden'];

    let errorDetails = (error as any)?.response?.data?.message;
    if (typeof errorDetails === 'object' && errorDetails !== null) {
        Object.keys(errorDetails).forEach(function eachKey(key) {
            displayToastify(errorDetails[key], !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.ERROR);
        });
    } else {
        if (errorDetails) {
            const isNonPremiumError = nonPremiumErrorsForSpotify.some((err) => errorDetails?.toLowerCase().includes(err.toLowerCase()));
            const isUserRegisteredError = userNotRegisteredErrorsForSpotify.some((err) => errorDetails?.toLowerCase().includes(err.toLowerCase()));
            const isNoPlayableDeviceError = noPlayableDeviceErrorsForSpotify.some((err) => errorDetails?.toLowerCase().includes(err.toLowerCase()));

            let messageToShow;
            if (isNonPremiumError) messageToShow = spotifyNonPremiumWarning;
            else if (isUserRegisteredError) messageToShow = spotifyUserNotRegisteredWarning;
            else if (isNoPlayableDeviceError) messageToShow = spotifyNoPlayableDeviceWarning;
            else messageToShow = errorDetails;

            displayToastify(messageToShow, !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.ERROR);
        } else {
            displayToastify(NETWORKERRORKEY, !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.ERROR);
        }
    }
};
