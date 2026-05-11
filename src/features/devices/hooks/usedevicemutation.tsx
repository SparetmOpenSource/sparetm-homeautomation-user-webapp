import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { usePatchUpdateData } from '../../../core/api/usereactqueryUpdate';
import { useBackDropOpen, useTheme } from '../../../core/router/Themeprovider';
import {
    IS_MQTT_CONFIGURED_KEY,
    LandscapeSizeM,
    MQTT_ERROR_PREFIX,
    MQTT_ERROR_USER_MESSAGE,
    RoutePath,
} from '../../../data/Constants';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../data/Enum';
import { SELECT_DEVICE_LIST_QUERY_ID } from '../../../data/QueryConstant';
import ApiErrorModal from '../../../shared/commoncomponents/apierrormodal/Apierrormodal';
import { displayToastify, invalidateQueries } from '../../../utils/HelperFn';

/**
 * Custom hook to handle device mutations with centralized MQTT error handling.
 *
 * @param url - The API URL for the mutation.
 * @param headers - request headers.
 * @param onSuccess - Callback function on success.
 * @param onError - Optional callback function on error (runs ONLY if not an MQTT error).
 * @param modalSize - Optional modal size (default: LandscapeSizeM).
 * @param onAnyError - Optional callback function that runs for ANY error (before specific handling).
 */
export const useDeviceMutation = (
    url: string,
    headers: any,
    onSuccess: (data: any) => void,
    onError?: (error: any) => void,
    modalSize: any = LandscapeSizeM,
    onAnyError?: (error: any) => void,
) => {
    const navigate = useNavigate();
    const darkTheme = useTheme();
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();
    const queryClient = useQueryClient();

    const {
        mutate: originalMutate,
        isLoading,
        error,
    } = usePatchUpdateData(
        url,
        headers,
        (data: any) => {
            // 1. Run the consumer's onSuccess callback
            onSuccess(data);
            localStorage.removeItem(IS_MQTT_CONFIGURED_KEY);

            // 2. Safety: Re-fetch after 3s to ensure state consistency if WS fails
            setTimeout(() => {
                invalidateQueries(queryClient, [SELECT_DEVICE_LIST_QUERY_ID]);
            }, 3000);
        },
        (err: any) => {
            // 0. Run Global Error Callback (Cleanup/Reversion)
            if (onAnyError) {
                onAnyError(err);
            }

            // 1. Check for specific MQTT Configuration Error
            if (
                err?.response?.status === 400 &&
                err?.response?.data?.message?.startsWith(MQTT_ERROR_PREFIX)
            ) {
                localStorage.setItem(IS_MQTT_CONFIGURED_KEY, 'false');
                const backdropId = `api-error-modal-${Date.now()}`;
                toggleBackDropOpen(
                    backdropId,
                    <ApiErrorModal
                        message={MQTT_ERROR_USER_MESSAGE}
                        darkTheme={darkTheme}
                        onNavigateToSettings={() => {
                            toggleBackDropClose(backdropId);
                            navigate(
                                `${RoutePath.CoreApplication_Setting}/${RoutePath.Setting_Account}`,
                            );
                        }}
                    />,
                    modalSize,
                );
            } else {
                // 2. Fallback to standard error toast or custom handler
                if (onError) {
                    onError(err);
                } else {
                    displayToastify(
                        err?.message,
                        !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                        TOASTIFYSTATE.ERROR,
                    );
                }
            }
        },
    );

    const mutate = (variables: any) => {
        const isMqttConfigured = localStorage.getItem(IS_MQTT_CONFIGURED_KEY);

        // Optimization: Block API call if we know MQTT config is missing
        if (isMqttConfigured === 'false') {
            // 1. Trigger Revert (Optimistic Rollback)
            if (onAnyError) {
                onAnyError(new Error(MQTT_ERROR_USER_MESSAGE));
            }

            // 2. Show Error Modal Immediately
            const backdropId = `api-error-modal-${Date.now()}`;
            toggleBackDropOpen(
                backdropId,
                <ApiErrorModal
                    message={MQTT_ERROR_USER_MESSAGE}
                    darkTheme={darkTheme}
                    onNavigateToSettings={() => {
                        toggleBackDropClose(backdropId);
                        navigate(
                            `${RoutePath.CoreApplication_Setting}/${RoutePath.Setting_Account}`,
                        );
                    }}
                />,
                modalSize,
            );
            return;
        }

        originalMutate(variables);
    };

    return { mutate, isLoading, error };
};
