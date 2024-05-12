import { useForm } from 'react-hook-form';
import './AddDeviceBackdropModel.css';
import { toast } from 'react-toastify';
import Select, { createFilter } from 'react-select';
import makeAnimated from 'react-select/animated';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { DeviceTypeConfig } from '../../../../Data/DeviceRoomConstant';
import { getAppAdminUser, getProfileName } from '../../../../Utils/ProfileConfigHelperFn';
import { useAddDevice } from '../../../../Api.tsx/CoreAppApis';
import Button from '../../../Others/CustomButton/Button';
const animatedComponents = makeAnimated();

const AddDeviceBackdropModel = (props: any) => {
    const SelectColorStyles = {
        menuList: (styles: any) => ({
            ...styles,
            background: '#1f2123',
            color: '#00FFFF', //color after opening dropdown
        }),
        option: (styles: any, { isFocused, isSelected }: any) => ({
            ...styles,
            background: isFocused
                ? '#2E3438'
                : isSelected
                ? 'rgb(0, 255, 255, 0.2)'
                : undefined,
            zIndex: 1,
        }),
        menu: (base: any) => ({
            ...base,
            zIndex: 100,
        }),
    };
    const location = useLocation();
    const adminName = getAppAdminUser();
    const profileName = getProfileName();

    const [deviceType, setDeviceType] = useState();
    const [ignoreCase] = useState(true);
    const [ignoreAccents] = useState(false);
    const [trim] = useState(true);
    const [matchFromStart] = useState(true);
    const filterConfig = {
        ignoreCase,
        ignoreAccents,
        trim,
        matchFrom: matchFromStart ? ('start' as const) : ('any' as const),
    };
    const room_type: any = location.pathname.split('/')[3].replace('%20', ' ');
    const {
        register: addDevice,
        formState: { errors: deviceErrors },
        handleSubmit: handleDeviceSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });
    /*********************CREATING PROFILE**********************/

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
    const { mutate } = useAddDevice(
        adminName,
        profileName,
        onError,
        props.closeAddDeviceModel,
    );

    /************************************************/

    const onDeviceSubmit = (data: any) => {
        Object.assign(data, { deviceType: deviceType, roomType: room_type });
        mutate(data);
        reset();
    };

    var addDeviceType = (el: any) => {
        setDeviceType(el.value);
    };

    return (
        <div className="addDeviceBackdropModel_form">
            <form
                onSubmit={handleDeviceSubmit(onDeviceSubmit)}
                className="addDeviceBackdropModel_form_container"
            >
                <h1>Please enter your device name with type</h1>
                <input
                    type="text"
                    className="addDeviceBackdropModel_form_field"
                    placeholder="device name"
                    style={{
                        background: '#1f2123',
                        color: 'lavender',
                    }}
                    {...addDevice('showName', {
                        required: 'subject is required',
                        minLength: {
                            value: 3,
                            message: 'subject is too short',
                        },
                        maxLength: {
                            value: 10,
                            message: 'subject is too long',
                        },
                    })}
                />
                {deviceErrors.showName && (
                    <p className="addDeviceBackdropModel_form_error">
                        {(deviceErrors.showName as any)?.message}
                    </p>
                )}
                <Select
                    className="addDeviceBackdropModel_form_select"
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    placeholder="Select type"
                    options={DeviceTypeConfig}
                    onChange={addDeviceType}
                    filterOption={createFilter(filterConfig)}
                    styles={SelectColorStyles}
                />
                {/* {!deviceErrors.showName && deviceType != null && ( */}
                {!deviceErrors.showName && (
                    <Button
                        label="Submit"
                        textCol="black"
                        backCol="#e2ff00"
                        width="150px"
                    />
                )}
            </form>
        </div>
    );
};

export default AddDeviceBackdropModel;
