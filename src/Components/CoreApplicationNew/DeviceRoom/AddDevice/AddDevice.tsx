import { useEffect, useState } from 'react';
import './AddDevice.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useForm } from 'react-hook-form';
import Button from '../../../Others/CustomButton/Button';
import Select from '../../../Others/Select/Select';
import { featureUrl } from '../../../../Api.tsx/CoreAppApis';
import { catchError, displayToastify, invalidateQueries } from '../../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../Data/Enum';
import { useUpdateData } from '../../../../Api.tsx/useReactQuery_Update';
import { useAppSelector } from '../../../../Features/ReduxHooks';
import { SELECT_DEVICE_LIST_QUERY_ID } from '../../../../Data/QueryConstant';
import { useQueryClient } from 'react-query';

const AddDevice = ({ darkTheme, roomType, toggleBackDropClose}: any) => {
   const queryClient = useQueryClient();
    const [color, setColor] = useState<any>(light_colors);
    const [type, setType] = useState<any>();
    const heading = 'Enter your device name and type';
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
            "Device added",
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

    const { mutate } = useUpdateData(
        `${featureUrl?.add_device}${admin}&profilename=${profile}`,
        on_Success,
        on_Error,
    );

    const onSubmitForm = (data: any) => {
        if(type !== "null"){
            Object.assign(
                data,
                { deviceType: type},
                { roomType: roomType},
            );
            mutate(data)
        }else{
            toggleBackDropClose();
            displayToastify(
                "Type missing!",
                !darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        }
        reset();
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="addDevice"
            style={{ backgroundColor: color?.inner, color: color?.text }}
        >
            <form
                onSubmit={handleSubmitForm(onSubmitForm)}
                className="addDevice_submitForm_wrapper"
            >
                <div className="addDevice_submitForm-heading">
                    <h1>{heading}</h1>
                </div>
                <section className="addDevice_submitForm_field_wrapper">
                    <input
                        type="text"
                        className="addDevice_submitForm_field"
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
                        <p className="addDevice_submitForm_error">
                            {(submitFormErrors?.showName as any)?.message}
                        </p>
                    )}
                </section>
                <Select darkTheme={darkTheme} setType={setType}/>
                <Button
                            label="Add"
                            textCol={color?.button}
                            backCol={color?.element}
                            backColOnDis={color?.element}
                            width="150px"
                            status={false}
                            border={color?.button}
                        />
            </form>
        </div>
    );
};

export default AddDevice;
