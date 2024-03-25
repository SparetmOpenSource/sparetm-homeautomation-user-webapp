import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './TodoListBoxAddingBackdrop.css';
import {
    catchError,
    displayToastify,
} from '../../../../../../../Utils/HelperFn';
import CalenderFrame from '../../../../../../Others/Calendar/CalenderFrame';
import Button from '../../../../../../Others/CustomButton/Button';
import TextBlinkAnimation from '../../../../../../Others/TextBlinkAnimation/TextBlinkAnimation';
import { useAddTodo } from '../../../../../../../Api.tsx/CoreAppApis';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../../Data/Enum';
import {
    getProfileId,
    getProfileName,
} from '../../../../../../../Utils/ProfileConfigHelperFn';

const TodoListBoxAddingBackdrop = (props: any) => {
    const [dateValue, setDateValue]: any = useState();
    const profileName = getProfileName();

    const sentence = `Hello, ${profileName}`.split('');
    const profileId = getProfileId();
    const {
        register: todoRegister,
        formState: { errors: todoErrors },
        handleSubmit: handleTodoSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    /*********************CREATING PROFILE**********************/

    const onError = (error: any) => {
        catchError(error);
    };
    const { mutate } = useAddTodo(profileId, onError, props.closeFn);

    /************************************************/
    const onTodoSubmit = (data: any) => {
        Object.assign(data, { targetedAt: dateValue });
        mutate(data);
        reset();
    };
    return (
        <div className="form" style={{ background: '#25292D' }}>
            <span className="form_heading">
                <span>
                    {sentence.map((letter, index) => {
                        return (
                            <TextBlinkAnimation
                                key={index}
                                color="aqua"
                                size="3rem"
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </TextBlinkAnimation>
                        );
                    })}
                </span>
                <p style={{ color: 'lavender' }}>
                    Please add your task details below(cal dead line)
                </p>
            </span>
            <span className="form_wrapper">
                <div>
                    <form
                        onSubmit={handleTodoSubmit(onTodoSubmit)}
                        className="form_container"
                    >
                        <input
                            type="text"
                            className="form_field"
                            placeholder="subject"
                            style={{
                                background: '#1f2123',
                                color: 'lavender',
                            }}
                            {...todoRegister('subject', {
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
                        {todoErrors.subject && (
                            <p className="form_error">
                                {(todoErrors.subject as any)?.message}
                            </p>
                        )}
                        <input
                            type="text"
                            className="form_field"
                            placeholder="statement"
                            style={{
                                background: '#1f2123',
                                color: 'lavender',
                            }}
                            {...todoRegister('statement', {
                                required: 'statement is required',
                                minLength: {
                                    value: 3,
                                    message: 'statement is too short',
                                },
                                maxLength: {
                                    value: 82,
                                    message: 'statement is too long',
                                },
                            })}
                        />
                        {todoErrors.statement && (
                            <p className="form_error">
                                {(todoErrors.statement as any)?.message}
                            </p>
                        )}
                        {!todoErrors.statement && (
                            <Button
                                label="Submit"
                                textCol="black"
                                backCol="#e2ff00"
                                width="150px"
                            />
                        )}
                    </form>
                </div>
                <div>
                    <CalenderFrame setNewDate={setDateValue} />
                </div>
            </span>
        </div>
    );
};

export default TodoListBoxAddingBackdrop;
