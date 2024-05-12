import { MdOutlineElectricalServices } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { lgAcRemoteCode } from '../../../../../Data/DeviceRoomConstant';
import './../DeviceRemote.css';
import { useDeleteDeviceStoreData, useUpdateDeviceStatus, useUpdateDeviceStoreData } from '../../../../../Api.tsx/CoreAppApis';
import { copyText } from '../../../../../Utils/HelperFn';
import Button from '../../../../Others/CustomButton/Button';
const DeviceAcRemote = ({ currentDevice, mqttCredDetails }: any) => {
    let deviceDataStore = [];
    if (currentDevice?.deviceDataStore !== null) {
        deviceDataStore = currentDevice?.deviceDataStore;
    }
    const {
        register: addRemoteCode,
        formState: { errors: remoteCodeErrors },
        handleSubmit: handleRemoteCodeSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    /*************************/

    const onError = (error: any) => {
        let errorDetails = error?.response.data.message;
        if (typeof errorDetails === 'object' && errorDetails !== null) {
            Object.keys(errorDetails).forEach(function eachKey(key) {
                toast.error(errorDetails[key]);
            });
        } else {
            toast.error(errorDetails);
        }
    };

    const { mutate } = useUpdateDeviceStatus(
        currentDevice?.adminName,
        currentDevice?.profileName,
        currentDevice?.roomType,
        currentDevice?.deviceId,
        onError,
    );

    const { mutate: saveDeviceStoreData } = useUpdateDeviceStoreData(
        currentDevice?.deviceId,
        onError,
    );

    const { mutate: removeDeviceStoreData } = useDeleteDeviceStoreData(
        currentDevice?.deviceId,
        onError,
    );
    /*************************/

    const dataStoreSize =
        currentDevice?.deviceDataStore !== null
            ? currentDevice?.deviceDataStore.length
            : 0;

    const handleRemoteClick = (index: any) => {
        // let storeDevice = lgAcRemoteCode;
        let storeDevice = [];
        if (currentDevice?.deviceDataStore !== null) {
            storeDevice = currentDevice?.deviceDataStore;
        }
        if (storeDevice[index] != null) {
            toast.info(storeDevice[index]);
        } else {
            toast.warn('No value');
        }

        mutate({
            status: true,
            statusDetail: `${storeDevice[index]}`,
            mqttPublisherId: mqttCredDetails?.mqttPublisherId,
            mqttServerAddress:
                mqttCredDetails?.mqttServerAddress +
                ':' +
                mqttCredDetails?.mqttServerPort,
            brokerUserName: mqttCredDetails?.brokerUserName,
            brokerPassword: mqttCredDetails?.brokerPassword,
        } as any);
    };

    const onRemoteCodeSubmit = (data: any) => {
        saveDeviceStoreData(data);
        toast.info(data.irCodes);
        reset();
    };

    return (
        <div className="deviceAcRemote">
            {deviceDataStore.length === 0 && (
                <section>
                    <p>
                        You can capture infrared{' '}
                        <span style={{ color: 'orangered' }}>codes</span> from a
                        handheld IR remote to create{' '}
                        <span style={{ color: 'orangered' }}>custom</span>{' '}
                        remote for operating IR-controlled devices.
                    </p>
                    <p>
                        To configure your custom remote, you can follow{' '}
                        <span style={{ color: 'orangered' }}>
                            documentation
                        </span>{' '}
                        in <MdOutlineElectricalServices />
                        connection section .
                    </p>
                    <p>
                        For instance, if you are using{' '}
                        <i>
                            <b style={{ color: 'orangered' }}>LG AC</b>
                        </i>
                        , you can copy the below code and save to your device.
                    </p>
                    <p
                        onClick={() => copyText(lgAcRemoteCode)}
                        className="textCopyLink"
                    >
                        <em>Click here to copy the code</em>
                    </p>
                    <span className="deviceAcRemote_code_input">
                        <form
                            onSubmit={handleRemoteCodeSubmit(
                                onRemoteCodeSubmit,
                            )}
                        >
                            <input
                                type="text"
                                placeholder="Enter 6 codes separated by coma..."
                                style={{
                                    background: '#1f2123',
                                    color: 'lavender',
                                }}
                                {...addRemoteCode('deviceDataStore', {
                                    required: 'Ir Codes is required',
                                })}
                            />
                            {remoteCodeErrors.deviceDataStore && (
                                <p className="deviceAcRemote_code_input_form_error">
                                    {
                                        (
                                            remoteCodeErrors.deviceDataStore as any
                                        )?.message
                                    }
                                </p>
                            )}
                            <Button
                                label="save"
                                textCol="black"
                                backCol="lightgreen"
                                width="80px"
                            />
                        </form>
                    </span>
                    <p>
                        <mark>
                            ...All the six codes will be mapped to the buttons
                            respectively...
                        </mark>
                    </p>
                </section>
            )}
            {deviceDataStore.length !== 0 && (
                <section className="deviceFanRemote_saved_details">
                    <span>
                        <div>
                            <p>ON/OFF : {currentDevice?.deviceDataStore[0]}</p>
                            <p>Temp - : {currentDevice?.deviceDataStore[1]}</p>
                            <p>Temp + : {currentDevice?.deviceDataStore[2]}</p>
                            <p>
                                Fan speed : {currentDevice?.deviceDataStore[3]}
                            </p>
                        </div>
                        <div>
                            <p>
                                Swing LR : {currentDevice?.deviceDataStore[4]}
                            </p>
                            <p>
                                Swing UD : {currentDevice?.deviceDataStore[5]}
                            </p>
                        </div>
                    </span>

                    <span>
                        <Button
                            label="Delete"
                            textCol="lavender"
                            backCol="green"
                            width="100px"
                            fn={() =>
                                removeDeviceStoreData({
                                    deviceDataStore: '',
                                } as any)
                            }
                        />
                    </span>
                </section>
            )}
            <section
                className="deviceAcRemote_btn"
                style={{ borderRadius: '5px solid white' }}
            >
                <span>
                    <Button
                        label="ON/OFF"
                        textCol="black"
                        backCol={
                            dataStoreSize !== 0
                                ? currentDevice?.deviceDataStore[0] ===
                                  currentDevice?.statusDetail
                                    ? 'lightgreen'
                                    : 'red'
                                : 'grey'
                        }
                        width="100px"
                        fn={() => handleRemoteClick('0')}
                    />
                </span>
                <span>
                    <Button
                        label="Temp -"
                        textCol="black"
                        backCol={
                            dataStoreSize !== 0
                                ? currentDevice?.deviceDataStore[1] ===
                                  currentDevice?.statusDetail
                                    ? 'lightgreen'
                                    : '#e2ff00'
                                : 'grey'
                        }
                        width="80px"
                        fn={() => handleRemoteClick('1')}
                    />
                    <Button
                        label="Temp +"
                        textCol="black"
                        backCol={
                            dataStoreSize !== 0
                                ? currentDevice?.deviceDataStore[2] ===
                                  currentDevice?.statusDetail
                                    ? 'lightgreen'
                                    : '#e2ff00'
                                : 'grey'
                        }
                        width="80px"
                        fn={() => handleRemoteClick('2')}
                    />
                </span>
                <span>
                    <Button
                        label="Fan Speed"
                        textCol="black"
                        backCol={
                            dataStoreSize !== 0
                                ? currentDevice?.deviceDataStore[3] ===
                                  currentDevice?.statusDetail
                                    ? 'lightgreen'
                                    : '#e2ff00'
                                : 'grey'
                        }
                        width="180px"
                        fn={() => handleRemoteClick('3')}
                    />
                </span>
                <span>
                    <Button
                        label="Swing --"
                        textCol="black"
                        backCol={
                            dataStoreSize !== 0
                                ? currentDevice?.deviceDataStore[4] ===
                                  currentDevice?.statusDetail
                                    ? 'lightgreen'
                                    : '#e2ff00'
                                : 'grey'
                        }
                        width="80px"
                        fn={() => handleRemoteClick('4')}
                    />
                    <Button
                        label="Swing |"
                        textCol="black"
                        backCol={
                            dataStoreSize !== 0
                                ? currentDevice?.deviceDataStore[5] ===
                                  currentDevice?.statusDetail
                                    ? 'lightgreen'
                                    : '#e2ff00'
                                : 'grey'
                        }
                        width="80px"
                        fn={() => handleRemoteClick('5')}
                    />
                </span>
            </section>
        </div>
    );
};

export default DeviceAcRemote;
