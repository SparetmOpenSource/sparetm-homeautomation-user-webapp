import { toast } from 'react-toastify';
import { RoutePath } from '../Data/Constants';
import { displayToastify } from './ToastService';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import { setBlinkColor, triggerBlink } from '../Features/Blink/BlinkSlice';
import { getItem } from '../Hooks/UseLocalStorage';
import { BLINK_NOTIFICATIONS_ENABLED_KEY } from '../Data/Constants';
import { getNotificationConfig } from './NotificationConfig';
import { playNotificationSound } from './AudioService';

export const copyText = async (text: any) => {
    try {
        const toCopy = text;
        await navigator.clipboard.writeText(toCopy);
        toast.info('Code copied!');
    } catch (err) {
        toast.info('Failed to copy: ' + err);
    }
};

export const logger = (file: string) => {
    const enable_logging: boolean = true;
    if (enable_logging) {
        console.log(`Logging for ${file}`);
    }
};

export const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            entry.target.classList.add('show-el');
        } else {
            entry.target.classList.remove('show-el');
        }
    });
});

export const doScroll = (paragraphRef: any) => {
    paragraphRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
};

export const reloadPage = () => {
    window.location.reload();
};

export const defaultOnSuccess = () => {};
export const defaultOnError = () => {};

export function getOffsetAndLimit(
    pageNumber: number,
    recordsPerPage: number,
): { offset: number; limit: number } {
    if (pageNumber < 1) throw new Error('Page number must be greater than or equal to 1.');
    if (recordsPerPage < 1) throw new Error('Records per page must be greater than or equal to 1.');
    const offset = (pageNumber - 1) * recordsPerPage;
    const limit = recordsPerPage;
    return { offset, limit };
}

export const navigateTo = (navigate: any, to: any) => {
    navigate(to);
};

export const uriArray = [
    RoutePath.CoreApplication_Room,
    RoutePath.SelectProfileConfig,
];

export const isSearchActive = (uriArray: any, uri: any) => {
    return uriArray?.some((item: any) => uri?.includes(item));
};

export const getFormattedDate = () => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    function getOrdinalSuffix(day: any) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = today.getMonth();
    const monthName = monthNames[monthIndex];
    const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
    const dateString = `${dayOfMonth}${ordinalSuffix} ${monthName}`;
    return dateString;
};

export const invalidateQueries = (queryClient: any, queryKeys: any) => {
    queryKeys.forEach((key: any) => {
        queryClient.invalidateQueries(key);
    });
};

export const executeLinkInNewTab = (url: string, darkTheme: any) => {
    if (url) {
        window.open(url, '_blank');
    } else {
        displayToastify(
            'URL is not provided or invalid',
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    }
};

export const trimToNChars = (str: string, lng: number) => {
    if (str?.length <= lng) return str; 
    return str?.slice(0, lng) + '...'; 
};

export const formatTime = (time: any) => {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};

export const handleClickForBlinkNotification = (
    color: any,
    status: string,
    dispatch: any,
) => {
    const { blinkSettings } = getNotificationConfig();
    const masterBlinkEnabled = getItem(BLINK_NOTIFICATIONS_ENABLED_KEY) ?? false;
    if (!masterBlinkEnabled) return;
    const isEnabled = blinkSettings[status] ?? true;
    if (!isEnabled) return;
    const colorMap: Record<string, string> = {
        SUCCESS: color?.success,
        ERROR: color?.error,
        WARNING: color?.warning,
        INFO: color?.info,
    };
    const blinkColor = colorMap[status] || 'gray';
    dispatch(setBlinkColor(blinkColor));
    dispatch(triggerBlink());
    playNotificationSound();
};
