import { useEffect, useState } from 'react';
import './AddDevice.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
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
import DynamicForm, { FieldConfig } from '../../../Others/DynamicForm/DynamicForm';

const AddDevice = ({ darkTheme, roomType, toggleBackDropClose }: any) => {
    const queryClient = useQueryClient();
    const [color, setColor] = useState<any>(light_colors);
    const [type, setType] = useState<any>();
    const heading = 'Specify a name and a type for your device';
    const profile = useAppSelector((state: any) => state?.user?.profile);
    const admin = useAppSelector((state: any) => state?.user?.admin);

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
            // Since DynamicForm handles the submit, we might want to prevent it closing if validation fails, 
            // but here we just show toast if Type is missing.
            // Ideally we'd valid type *before* DynamicForm calls submit, but DynamicForm doesn't know about `type`.
            // So we just check it here. Use toast for error.
            displayToastify(
                'Please select the device Type!',
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.WARN,
            );
        }
    };

    const toggleDeviceType = (type: string) => {
        setType(type);
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    const deviceFormFields: FieldConfig[] = [
        {
            id: 1,
            name: 'showName',
            type: 'text',
            label: 'enter device name',
            validation: {
                required: 'name is required',
                minLength: { value: 3, message: 'name is too short' },
                maxLength: { value: 10, message: 'name is too long' },
            }
        }
    ];

    return (
        <div className="addDevice" style={{ backgroundColor: color?.inner }}>
             <p
                style={{
                    color: color?.text,
                    fontWeight: 'lighter',
                    fontSize: '26px',
                    marginBottom: '0.2rem', 
                    textAlign: 'center'
                }}
             >
                {heading}
             </p>
             <DynamicForm
                fields={deviceFormFields}
                onSubmit={onSubmitForm}
                submitLabel="Add"
             >
                <div className="addDevice-form-wrapper-select">
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
                                    title={item?.label}
                                >
                                    {trimToNChars(item?.label, 5)}
                                </p>
                            </motion.span>
                        ))}
                    </div>
                </div>
             </DynamicForm>
        </div>
    );
};

export default AddDevice;
