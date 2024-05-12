import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { IconContext } from 'react-icons';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './TodoListStatusChangeBackdrop.css';
import { useUpdateTodo } from '../../../../../../../Api.tsx/CoreAppApis';
import { SpringSuspense } from '../../../../../../../Data/Constants';
import Backdrop from '../../../../../../Others/BackdropModel/Backdrop/Backdrop';
import Button from '../../../../../../Others/CustomButton/Button';
import { displayToastify } from '../../../../../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../../Data/Enum';

const TodoListStatusChangeBackdrop = ({
    handleClose,
    foregroundColor,
    backgroundColor,
    status,
    todoId,
}: any) => {
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
        displayToastify(
            error?.response?.data?.message,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };
    const { mutate } = useUpdateTodo(todoId, onError, handleClose);

    // mutate, isLoading, isSuccess, isError, error

    /************************************************/

    const onTodoSubmit = (data: any) => {
        let val: any = null;
        if (status === 'STATUS_NEW') {
            if (
                (data?.STATUS_INPROGRESS === true &&
                    data?.STATUS_COMPLETED === false) ||
                (data?.STATUS_INPROGRESS === false &&
                    data?.STATUS_COMPLETED === true)
            ) {
                val = data?.STATUS_INPROGRESS
                    ? 'STATUS_INPROGRESS'
                    : 'STATUS_COMPLETED';
            }
        }
        if (status === 'STATUS_INPROGRESS') {
            if (
                (data?.STATUS_NEW === true &&
                    data?.STATUS_COMPLETED === false) ||
                (data?.STATUS_NEW === false && data?.STATUS_COMPLETED === true)
            ) {
                val = data?.STATUS_COMPLETED
                    ? 'STATUS_COMPLETED'
                    : 'STATUS_NEW';
            }
        }
        if (status === 'STATUS_COMPLETED') {
            if (
                (data?.STATUS_NEW === true &&
                    data?.STATUS_INPROGRESS === false) ||
                (data?.STATUS_NEW === false && data?.STATUS_INPROGRESS === true)
            ) {
                val = data?.STATUS_NEW ? 'STATUS_NEW' : 'STATUS_INPROGRESS';
            }
        }
        if (val !== null) {
            mutate(Object.assign({ status: val }));
        } else {
            displayToastify(
                'Invalid input',
                TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        }
        reset();
    };
    return (
        <Backdrop onClick={handleClose} backgroundColor={backgroundColor}>
            <motion.div
                drag
                onClick={(e) => e.stopPropagation()}
                className="confirmationBackdropModel"
                variants={SpringSuspense}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ background: foregroundColor }}
            >
                <ConfirmationModalButton onClick={handleClose} />
                <form
                    onSubmit={handleTodoSubmit(onTodoSubmit)}
                    className="form_container1"
                >
                    <section>
                        <div
                            style={{
                                background: 'rgb(0,255,0,0.5)',
                                border:
                                    status === 'STATUS_NEW'
                                        ? '3px solid white'
                                        : '',
                            }}
                        >
                            {!(status === 'STATUS_NEW') && (
                                <input
                                    type="checkbox"
                                    className="form_field1"
                                    style={{
                                        background: '#1f2123',
                                        color: 'lavender',
                                    }}
                                    {...todoRegister('STATUS_NEW')}
                                />
                            )}
                            <label>NEW</label>
                        </div>
                        <div
                            style={{
                                background: 'rgb(255, 69, 0,0.5)',
                                border:
                                    status === 'STATUS_INPROGRESS'
                                        ? '3px solid white'
                                        : '',
                            }}
                        >
                            {!(status === 'STATUS_INPROGRESS') && (
                                <input
                                    type="checkbox"
                                    className="form_field1"
                                    style={{
                                        background: '#1f2123',
                                        color: 'lavender',
                                    }}
                                    {...todoRegister('STATUS_INPROGRESS')}
                                />
                            )}
                            <label>Inprogress</label>
                        </div>
                        <div
                            style={{
                                background: 'rgb(255, 255, 255, 0.5)',
                                color: 'black',
                                border:
                                    status === 'STATUS_COMPLETED'
                                        ? '3px solid white'
                                        : '',
                            }}
                        >
                            {!(status === 'STATUS_COMPLETED') && (
                                <input
                                    type="checkbox"
                                    className="form_field1"
                                    style={{
                                        background: '#1f2123',
                                        color: 'lavender',
                                    }}
                                    {...todoRegister('STATUS_COMPLETED')}
                                />
                            )}
                            <label>Completed</label>
                        </div>
                    </section>
                    <section>
                        {!todoErrors.statement && (
                            <Button
                                label="Submit"
                                textCol="black"
                                backCol="#e2ff00"
                                width="150px"
                            />
                        )}
                    </section>
                </form>
            </motion.div>
        </Backdrop>
    );
};
const ConfirmationModalButton = ({ onClick }: any) => (
    <motion.div
        className="confirmation_modal_button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
    >
        <IconContext.Provider value={{ size: '2em' }}>
            <span>
                <AiOutlineCloseCircle />
            </span>
        </IconContext.Provider>
    </motion.div>
);

export default TodoListStatusChangeBackdrop;
