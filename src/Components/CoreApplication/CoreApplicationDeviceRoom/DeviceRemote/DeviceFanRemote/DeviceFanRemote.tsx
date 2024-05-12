import './../DeviceRemote.css';
import { MdOutlineElectricalServices } from 'react-icons/md';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import { useDeleteDeviceStoreData, useUpdateDeviceStatus, useUpdateDeviceStoreData } from '../../../../../Api.tsx/CoreAppApis';
import Button from '../../../../Others/CustomButton/Button';
import { copyText } from '../../../../../Utils/HelperFn';
import { atomBergRemoteCode } from '../../../../../Data/DeviceRoomConstant';
const DeviceFanRemote = ({ currentDevice, mqttCredDetails }: any) => {
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
        // let storeDevice = atomBergRemoteCode;
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
        <div className="deviceFanRemote">
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
                            <b style={{ color: 'orangered' }}>ATOMBERG FAN</b>
                        </i>
                        , you can copy the below code and save to your device.
                    </p>
                    <p
                        onClick={() => copyText(atomBergRemoteCode)}
                        className="textCopyLink"
                    >
                        <em>Click here to copy the code</em>
                    </p>
                    <span className="deviceFanRemote_code_input">
                        <form
                            onSubmit={handleRemoteCodeSubmit(
                                onRemoteCodeSubmit,
                            )}
                        >
                            <input
                                type="text"
                                placeholder="Enter 7 codes separated by coma..."
                                style={{
                                    background: '#1f2123',
                                    color: 'lavender',
                                }}
                                {...addRemoteCode('deviceDataStore', {
                                    required: 'Ir Codes is required',
                                })}
                            />
                            {remoteCodeErrors.deviceDataStore && (
                                <p className="deviceFanRemote_code_input_form_error">
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
                            ...All the seven codes will be mapped to the buttons
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
                            <p>
                                First speed :{' '}
                                {currentDevice?.deviceDataStore[1]}
                            </p>
                            <p>
                                Second speed :{' '}
                                {currentDevice?.deviceDataStore[2]}
                            </p>
                            <p>
                                Third speed :{' '}
                                {currentDevice?.deviceDataStore[3]}
                            </p>
                        </div>
                        <div>
                            <p>
                                Forth speed :{' '}
                                {currentDevice?.deviceDataStore[4]}
                            </p>
                            <p>
                                Fifth speed :{' '}
                                {currentDevice?.deviceDataStore[5]}
                            </p>
                            <p>
                                Sixth speed :{' '}
                                {currentDevice?.deviceDataStore[6]}
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
                className="deviceFanRemote_btn"
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
                        label="1"
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
                        label="2"
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
                        label="3"
                        textCol="black"
                        backCol={
                            dataStoreSize !== 0
                                ? currentDevice?.deviceDataStore[3] ===
                                  currentDevice?.statusDetail
                                    ? 'lightgreen'
                                    : '#e2ff00'
                                : 'grey'
                        }
                        width="80px"
                        fn={() => handleRemoteClick('3')}
                    />
                    <Button
                        label="4"
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
                </span>
                <span>
                    <Button
                        label="5"
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
                    <Button
                        label="6"
                        textCol="black"
                        backCol={
                            dataStoreSize !== 0
                                ? currentDevice?.deviceDataStore[6] ===
                                  currentDevice?.statusDetail
                                    ? 'lightgreen'
                                    : '#e2ff00'
                                : 'grey'
                        }
                        width="80px"
                        fn={() => handleRemoteClick('6')}
                    />
                </span>
            </section>
        </div>
    );
};

export default DeviceFanRemote;
