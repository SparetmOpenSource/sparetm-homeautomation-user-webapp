import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { IconContext } from 'react-icons';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './TodoListEditBackdrop.css';
import { useUpdateTodo } from '../../../../../../../Api.tsx/CoreAppApis';
import Backdrop from '../../../../../../Others/BackdropModel/Backdrop/Backdrop';
import { SpringSuspense } from '../../../../../../../Data/Constants';
import Button from '../../../../../../Others/CustomButton/Button';
import { catchError } from '../../../../../../../Utils/HelperFn';

const TodoListEditBackdrop = ({
    handleClose,
    foregroundColor,
    backgroundColor,
    todoId,
}: any) => {
    const {
        register: edit,
        formState: { errors: editErrors },
        handleSubmit: handleEditSubmit,
        reset,
    } = useForm({
        mode: 'onBlur',
    });

    /*********************CREATING PROFILE**********************/

    const onError = (error: any) => {
        // catchError(error);
    };
    const { mutate } = useUpdateTodo(todoId, onError, handleClose);

    // mutate, isLoading, isSuccess, isError, error

    /************************************************/

    const onEditSubmit = (data: any) => {
        mutate(data);
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
                {/* ****************** */}
                <form
                    onSubmit={handleEditSubmit(onEditSubmit)}
                    className="todo_edit_form_wrapper"
                >
                    <h1>Edit your statement</h1>
                    {/* ****************************UserName field********************************* */}

                    <input
                        type="text"
                        className="todo_edit_form_field"
                        placeholder="edit statement*"
                        style={{
                            background: 'rgb(11, 20, 22)',
                            color: 'lavender',
                        }}
                        {...edit('statement', {
                            required: 'Statement is required',
                            minLength: {
                                value: 7,
                                message: 'Statement is too short',
                            },
                            maxLength: {
                                value: 51,
                                message: 'Statement is too long',
                            },
                        })}
                    />
                    {editErrors.statement && (
                        <p className="todo_edit_form_error">
                            {(editErrors.statement as any)?.message}
                        </p>
                    )}
                    {!editErrors.statement && (
                        <Button
                            label="Submit"
                            textCol="black"
                            backCol="rgb(8,246,125)"
                            width="150px"
                        />
                    )}
                </form>
                {/* ****************** */}
            </motion.div>
        </Backdrop>
    );
};
const ConfirmationModalButton = ({ onClick }: any) => (
    <motion.div
        className="todo_confirmation_modal_button"
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
export default TodoListEditBackdrop;
