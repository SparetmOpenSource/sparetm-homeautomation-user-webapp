import { useEffect, useState } from 'react';
import './AddDevice.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useForm } from 'react-hook-form';

const AddDevice = ({ darkTheme }: any) => {
    const [color, setColor] = useState<any>(light_colors);
    const heading = 'Enter your device name and type';

    const {
        register: submitForm,
        formState: { errors: submitFormErrors },
        handleSubmit: handleSubmitForm,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    const onSubmitForm = (data: any) => {
        // setInputData(data);
        console.log(data);
        reset();
    };

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="addDevice"
            style={{ backgroundColor: color?.element, color: color?.text }}
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
                            {(submitFormErrors.showName as any)?.message}
                        </p>
                    )}
                </section>
            </form>
        </div>
    );
};

export default AddDevice;
