import { useState } from 'react';
import CalenderFrame from '../../../../../../Others/Calendar/CalenderFrame';
import './TodoListBoxAddingBackdrop.css';
import { useForm } from 'react-hook-form';
import { catchError } from '../../../../../../../Utils/HelperFn';
import { useAddTodo } from '../../../../../../../Api.tsx/CoreAppApis';
import { getProfileId } from '../../../../../../../Utils/ProfileConfigHelperFn';
import Button from '../../../../../../Others/CustomButton/Button';
import TextBlinkAnimation from '../../../../../../Others/TextBlinkAnimation/TextBlinkAnimation';

const TodoListBoxAddingBackdrop = (props: any) => {
    const sentence = `Set a completion date`.split('');
    const [dateValue, setDateValue]: any = useState();
    const profileId = getProfileId();
    const {
        register: todoRegister,
        formState: { errors: todoErrors },
        handleSubmit: handleTodoSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

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
        <div className="todoListBoxAddingBackdrop">
            <section>
                <form
                    onSubmit={handleTodoSubmit(onTodoSubmit)}
                    className="form_container"
                >
                    <input
                        type="text"
                        className="form_field"
                        placeholder="subject"
                        style={{
                            background: 'rgb(26,40,45)',
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
                            background: 'rgb(26,40,45)',
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
                            backCol="rgb(8,246,125)"
                            width="150px"
                        />
                    )}
                </form>
            </section>
            <section>
                <div>
                    <span>
                        {sentence.map((letter, index) => {
                            return (
                                <TextBlinkAnimation
                                    key={index}
                                    color="lavender"
                                    size="2rem"
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </TextBlinkAnimation>
                            );
                        })}
                    </span>
                    <p>
                        Setting a deadline helps you stay on track and ensures
                        timely completion of your tasks
                    </p>
                </div>
                <div>
                    <CalenderFrame setNewDate={setDateValue} />
                </div>
            </section>
        </div>
    );
};

export default TodoListBoxAddingBackdrop;
