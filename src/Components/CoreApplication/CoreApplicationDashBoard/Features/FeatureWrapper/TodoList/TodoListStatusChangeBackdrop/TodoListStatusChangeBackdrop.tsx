import { motion } from 'framer-motion';
import Backdrop from '../../../../../../Others/BackdropModel/Backdrop/Backdrop';
import './TodoListStatusChangeBackdrop.css';
import { SpringSuspense } from '../../../../../../../Data/Constants';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { WiMoonNew } from 'react-icons/wi';
import { GrInProgress } from 'react-icons/gr';
import { WiMoonAltNew } from 'react-icons/wi';
import { useForm } from 'react-hook-form';
import { displayToastify } from '../../../../../../../Utils/HelperFn';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../../../Data/Enum';
import { useUpdateTodo } from '../../../../../../../Api.tsx/CoreAppApis';
import Button from '../../../../../../Others/CustomButton/Button';

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
                'Please select any one option',
                TOASTIFYCOLOR.LIGHT,
                TOASTIFYSTATE.ERROR,
            );
        }
        reset();
    };

    return (
        <Backdrop onClick={handleClose} backgroundColor={backgroundColor}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="todoListStatusChangeBackdrop_model"
                variants={SpringSuspense}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ background: foregroundColor }}
            >
                <ConfirmationModalButton onClick={handleClose} />
                <div className="todoListStatusChangeBackdrop_progress">
                    <span className="todoListStatusChangeBackdrop_progress_icon">
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color:
                                    status === 'STATUS_NEW' ||
                                    status === 'STATUS_INPROGRESS' ||
                                    status === 'STATUS_COMPLETED'
                                        ? 'rgb(59,228,137)'
                                        : 'rgb(128, 128, 128, 0.3)',
                            }}
                        >
                            <WiMoonNew />
                        </IconContext.Provider>
                    </span>
                    <span
                        className="todoListStatusChangeBackdrop_progress_separation"
                        style={{
                            backgroundColor:
                                status === 'STATUS_INPROGRESS' ||
                                status === 'STATUS_COMPLETED'
                                    ? 'lavender'
                                    : 'rgb(128, 128, 128, 0.3)',
                        }}
                    ></span>
                    <span className="todoListStatusChangeBackdrop_progress_icon">
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color:
                                    status === 'STATUS_INPROGRESS' ||
                                    status === 'STATUS_COMPLETED'
                                        ? 'rgb(59,228,137)'
                                        : 'rgb(128, 128, 128, 0.3)',
                            }}
                        >
                            <GrInProgress />
                        </IconContext.Provider>
                    </span>
                    <span
                        className="todoListStatusChangeBackdrop_progress_separation"
                        style={{
                            backgroundColor:
                                status === 'STATUS_COMPLETED'
                                    ? 'lavender'
                                    : 'rgb(128, 128, 128, 0.3)',
                        }}
                    ></span>
                    <span className="todoListStatusChangeBackdrop_progress_icon">
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color:
                                    status === 'STATUS_COMPLETED'
                                        ? 'rgb(59,228,137)'
                                        : 'rgb(128, 128, 128, 0.3)',
                            }}
                        >
                            <WiMoonAltNew />
                        </IconContext.Provider>
                    </span>
                </div>
                <form
                    onSubmit={handleTodoSubmit(onTodoSubmit)}
                    className="todoListStatusChangeBackdrop_progress_selector"
                >
                    <section>
                        <div
                            style={{
                                background:
                                    status === 'STATUS_NEW'
                                        ? 'red'
                                        : 'rgb(42,46,33)',
                                color: 'lavender',
                                border:
                                    status === 'STATUS_NEW'
                                        ? '3px solid white'
                                        : '',
                            }}
                        >
                            {!(status === 'STATUS_NEW') && (
                                <input
                                    type="checkbox"
                                    style={{
                                        background: '#1f2123',
                                        color: 'lavender',
                                    }}
                                    {...todoRegister('STATUS_NEW')}
                                />
                            )}
                            <label>New</label>
                        </div>
                        <div
                            style={{
                                background:
                                    status === 'STATUS_INPROGRESS'
                                        ? 'red'
                                        : 'rgb(42,46,33)',
                                color: 'lavender',
                                border:
                                    status === 'STATUS_INPROGRESS'
                                        ? '3px solid white'
                                        : '',
                            }}
                        >
                            {!(status === 'STATUS_INPROGRESS') && (
                                <input
                                    type="checkbox"
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
                                background:
                                    status === 'STATUS_COMPLETED'
                                        ? 'red'
                                        : 'rgb(42,46,33)',
                                color: 'lavender',
                                border:
                                    status === 'STATUS_COMPLETED'
                                        ? '3px solid white'
                                        : '',
                            }}
                        >
                            {!(status === 'STATUS_COMPLETED') && (
                                <input
                                    type="checkbox"
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
                                backCol="rgb(8,246,125)"
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
        className="todoListStatusChangeBackdrop_modal_button"
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
