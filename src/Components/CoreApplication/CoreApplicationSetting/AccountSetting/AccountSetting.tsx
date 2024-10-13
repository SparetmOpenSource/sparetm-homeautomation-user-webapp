import { useForm } from 'react-hook-form';
import './AccountSetting.css';
import Button from '../../../Others/CustomButton/Button';
import { catchError } from '../../../../Utils/HelperFn';
import {
   
    useAddMqttCred,
} from '../../../../Api.tsx/ProfileConfigApis';
import { getAppAdminUser } from '../../../../Utils/ProfileConfigHelperFn';
import { SELECT_MQTT_CRED_QUERY_ID } from '../../../../Data/QueryConstant';
import { useReactQuery_Get } from '../../../../Api.tsx/useReactQuery_Get';
import LoadingFade from '../../../Others/LoadingAnimation/LoadingFade';
import { useTheme } from '../../../../Pages/ThemeProvider';

const AccountSetting = () => {
    const appUser = getAppAdminUser();
    const darkTheme: any = useTheme();
    const {
        register: mqttRegister,
        formState: { errors: mqttErrors },
        handleSubmit: handleMqttSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const onMqttSubmit = (data: any) => {
        mutate(data);
        reset();
    };

    const on_AddMqtt_Error = (error: any) => {
        // catchError(error);
    };
    const { mutate } = useAddMqttCred(appUser, on_AddMqtt_Error);

    // const mqttCredFn = () => {
    //     return getMqttCred(appUser, darkTheme);
    // };
    // const on_MqttCred_Success = () => {};
    // const on_MqttCred_Error = (error: any) => {
    //     // catchError(error);
    // };

    // const { isLoading, data: mqttCredData } = useReactQuery_Get(
    //     SELECT_MQTT_CRED_QUERY_ID,
    //     mqttCredFn,
    //     on_MqttCred_Success,
    //     on_MqttCred_Error,
    //     true, // !fetch_On_Click_Status
    //     true, // refetch_On_Mount
    //     false, // refetch_On_Window_Focus
    //     false, // refetch_Interval
    //     false, // refetch_Interval_In_Background
    //     300000, // Cache time
    //     0, // Stale Time
    // );

    return (
        <div className="accountSetting">
            <h1>Mqtt Credentials</h1>
            <div className="accountSetting_form_container">
                <section>
                    <form
                        className="accountSetting_form"
                        onSubmit={handleMqttSubmit(onMqttSubmit)}
                    >
                        <span>
                            <input
                                type="text"
                                className="accountSetting_form_field"
                                placeholder="enter server address"
                                {...mqttRegister('mqttServerAddress', {
                                    required: 'server address is required',
                                    minLength: {
                                        value: 8,
                                        message: 'server address is too short',
                                    },
                                    maxLength: {
                                        value: 500,
                                        message: 'server address is too long',
                                    },
                                })}
                            />
                            {mqttErrors.mqttServerAddress && (
                                <p className="accountSetting_form_error">
                                    {
                                        (mqttErrors?.mqttServerAddress as any)
                                            ?.message
                                    }
                                </p>
                            )}
                        </span>
                        <span>
                            <input
                                type="text"
                                className="accountSetting_form_field"
                                placeholder="enter server port"
                                {...mqttRegister('mqttServerPort', {
                                    required: 'server port is required',
                                    minLength: {
                                        value: 4,
                                        message: 'server port is too short',
                                    },
                                    maxLength: {
                                        value: 8,
                                        message: 'server port is too long',
                                    },
                                })}
                            />
                            {mqttErrors.mqttServerPort && (
                                <p className="accountSetting_form_error">
                                    {
                                        (mqttErrors?.mqttServerPort as any)
                                            ?.message
                                    }
                                </p>
                            )}
                        </span>
                        <span>
                            <input
                                type="text"
                                className="accountSetting_form_field"
                                placeholder="enter user name"
                                {...mqttRegister('brokerUserName', {
                                    required: 'user name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'user name is too short',
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: 'user name is too long',
                                    },
                                })}
                            />
                            {mqttErrors?.brokerUserName && (
                                <p className="accountSetting_form_error">
                                    {
                                        (mqttErrors?.brokerUserName as any)
                                            ?.message
                                    }
                                </p>
                            )}
                        </span>
                        <span>
                            <input
                                type="text"
                                className="accountSetting_form_field"
                                placeholder="enter password"
                                {...mqttRegister('brokerPassword', {
                                    required: 'password is required',
                                    minLength: {
                                        value: 3,
                                        message: 'password is too short',
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: 'password is too long',
                                    },
                                })}
                            />
                            {mqttErrors?.brokerPassword && (
                                <p className="accountSetting_form_error">
                                    {
                                        (mqttErrors?.brokerPassword as any)
                                            ?.message
                                    }
                                </p>
                            )}
                        </span>
                        <span>
                            {!mqttErrors?.mqttServerAddress &&
                                !mqttErrors?.mqttServerPort &&
                                !mqttErrors?.brokerUserName &&
                                !mqttErrors?.brokerPassword && (
                                    <Button
                                        label="Submit"
                                        textCol="black"
                                        backCol="rgb(8,246,125)"
                                        width="150px"
                                    />
                                )}
                        </span>
                    </form>
                </section>
                {/* {isLoading && (
                    <section>
                        <LoadingFade />
                    </section>
                )} */}
                {/* {!isLoading && (
                    <section>
                        <h1>Saved Mqtt Data</h1>
                        <p>
                            {
                                mqttCredData?.data?.body?.mqttPublisherId?.split(
                                    '@',
                                )[0]
                            }
                        </p>
                        <p>{mqttCredData?.data?.body?.mqttServerAddress}</p>
                        <p>{mqttCredData?.data?.body?.mqttServerPort}</p>
                        <p>{mqttCredData?.data?.body?.brokerUserName}</p>
                        <p>{mqttCredData?.data?.body?.brokerPassword}</p>
                    </section>
                )} */}
            </div>
        </div>
    );
};
export default AccountSetting;
