import { useEffect, useState } from 'react';
import './AddDevice.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useForm } from 'react-hook-form';
import Button from '../../../Others/CustomButton/Button';
import { featureUrl } from '../../../../Api.tsx/CoreAppApis';
import {
    appliance,
    catchError,
    changeDeviceIcon,
    displayToastify,
    invalidateQueries,
    trimToNChars,
} from '../../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';
import { useAppSelector } from '../../../../Features/ReduxHooks';
import { SELECT_DEVICE_LIST_QUERY_ID } from '../../../../Data/QueryConstant';
import { useQueryClient } from 'react-query';
import { usePostUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { updateHeaderConfig } from '../../../../Api.tsx/Axios';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';

const AddDevice = ({ darkTheme, roomType, toggleBackDropClose }: any) => {
    const queryClient = useQueryClient();
    const [color, setColor] = useState<any>(light_colors);
    const [type, setType] = useState<any>();
    const heading = 'Specify a name and a type for your device';
    const profile = useAppSelector((state: any) => state?.user?.profile);
    const admin = useAppSelector((state: any) => state?.user?.admin);

    const {
        register: submitForm,
        formState: { errors: submitFormErrors },
        handleSubmit: handleSubmitForm,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const on_Success = () => {
        toggleBackDropClose();
        displayToastify(
            'Device added',
            !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.SUCCESS,
        );
        let queryArray: any = [];
        queryArray.push(SELECT_DEVICE_LIST_QUERY_ID);
        invalidateQueries(queryClient, queryArray);
    };
    const on_Error = (error: any) => {
        toggleBackDropClose();
        catchError(error, darkTheme);
    };

    const { mutate } = usePostUpdateData(
        `${featureUrl?.add_device}${admin}&profilename=${profile}`,
        updateHeaderConfig,
        on_Success,
        on_Error,
    );

    const onSubmitForm = (data: any) => {
        if (type !== undefined) {
            Object.assign(data, { deviceType: type }, { roomType: roomType });
            mutate(data);
        } else {
            toggleBackDropClose();
            displayToastify(
                'Please select the device Type!',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.WARN,
            );
        }
        reset();
    };

    const toggleDeviceType = (type: string) => {
        setType(type);
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="addDevice" style={{ backgroundColor: color?.inner }}>
            <form
                onSubmit={handleSubmitForm(onSubmitForm)}
                className="addDevice-form-wrapper"
            >
                <section
                    className="addDevice-form-wrapper-input"
                    style={{ backgroundColor: color?.inner }}
                >
                    <p
                        style={{
                            color: color?.text,
                        }}
                    >
                        {heading}
                    </p>
                    <input
                        type="text"
                        className="addDevice-form-wrapper-input-field"
                        placeholder="enter device name"
                        style={{
                            background: color?.element,
                            color: color?.text,
                        }}
                        {...submitForm('showName', {
                            required: `name is required`,
                            minLength: {
                                value: 3,
                                message: `name is too short`,
                            },
                            maxLength: {
                                value: 10,
                                message: `name is too long`,
                            },
                        })}
                    />
                    {submitFormErrors.showName && (
                        <p className="addDevice-form-wrapper-input-field-error">
                            {(submitFormErrors?.showName as any)?.message}
                        </p>
                    )}
                </section>
                <section className="addDevice-form-wrapper-select">
                    <div style={{ backgroundColor: color?.outer }}>
                        {appliance?.map((item: any) => (
                            <motion.span
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    backgroundColor: color?.element,
                                    border:
                                        type === item?.value
                                            ? `2px solid ${color?.button}`
                                            : '',
                                }}
                                key={item?.id}
                                onClick={() => toggleDeviceType(item?.value)}
                            >
                                <IconContext.Provider
                                    value={{
                                        size: '1.5em',
                                        color:
                                            type === item?.value
                                                ? color?.button
                                                : color?.icon,
                                    }}
                                >
                                    {changeDeviceIcon(
                                        item?.label
                                            .trim()
                                            .replace(/\s+/g, '')
                                            .toUpperCase(),
                                    )}
                                </IconContext.Provider>
                                <p
                                    style={{
                                        color:
                                            type === item?.value
                                                ? color?.text
                                                : color?.icon,
                                    }}
                                >
                                    {trimToNChars(item?.label, 5)}
                                </p>
                            </motion.span>
                        ))}
                    </div>
                    <div style={{ backgroundColor: color?.inner }}>
                        <Button
                            label="Add"
                            textCol={color?.button}
                            backCol={color?.element}
                            width="150px"
                            status={false}
                            border={color?.button}
                        />
                    </div>
                </section>
            </form>
        </div>
    );
};

export default AddDevice;
