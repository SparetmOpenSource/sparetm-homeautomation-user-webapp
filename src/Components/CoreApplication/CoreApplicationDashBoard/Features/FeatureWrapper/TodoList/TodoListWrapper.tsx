import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { FcPlus } from 'react-icons/fc';
import './TodoListWrapper.css';
import { catchError } from '../../../../../../Utils/HelperFn';
import {
    getTodoList,
    useDeleteTodo,
} from '../../../../../../Api.tsx/CoreAppApis';
import { useReactQuery_Get } from '../../../../../../Api.tsx/useReactQuery_Get';
import LoadingFade from '../../../../../Others/LoadingAnimation/LoadingFade';
import TodoListBox from './TodoListBox/TodoListBox';
import ConfirmationBackdropModel from '../../../../../Others/BackdropModel/ConfirmationBackdropModel/ConfirmationBackdropModel';
import WindowBackdropModel from '../../../../../Others/BackdropModel/WindowBackdropModel/WindowBackdropModel';
import TodoListBoxAddingBackdrop from './TodoListBoxAddingBackdrop/TodoListBoxAddingBackdrop';
import TodoListEditBackdrop from './TodoListEditBackdrop/TodoListEditBackdrop';
import TodoListStatusChangeBackdrop from './TodoListStatusChangeBackdrop/TodoListStatusChangeBackdrop';
import { getProfileId } from '../../../../../../Utils/ProfileConfigHelperFn';

const TodoListWrapper = () => {
    const profileId = getProfileId();
    const [openDeleteTodoModel, setOpenDeleteTodoModel]: any = useState(false);
    const [idToBeDeleted, setIdToBeDeleted]: any = useState();
    const [idToBeUpdatedStatus, setIdToBeUpdatedStatus]: any = useState();
    const [statusToBeUpdated, setstatusToBeUpdated]: any = useState();

    const closeDeleteTodo = () => {
        setOpenDeleteTodoModel(false);
    };
    const openDeleteTodo = (id: any) => {
        setIdToBeDeleted(id);
        setOpenDeleteTodoModel(true);
    };

    const [openChangeStatusModel, setOpenChangeStatusModel] = useState(false);
    const closeChangeStatus = () => {
        setOpenChangeStatusModel(false);
    };
    const openChangeStatus = (id: any, status: any) => {
        setIdToBeUpdatedStatus(id);
        setstatusToBeUpdated(status);
        setOpenChangeStatusModel(true);
    };

    const [openEditTodoModel, setOpenEditTodoModel] = useState(false);
    const closeEditTodo = () => {
        setOpenEditTodoModel(false);
    };
    const openEditTodo = (id: any) => {
        setIdToBeUpdatedStatus(id);
        setOpenEditTodoModel(true);
    };

    const [openAddTodoModel, setOpenAddTodoModel] = useState(false);
    const closeAddTodo = () => {
        setOpenAddTodoModel(false);
    };
    const openAddTodo = () => {
        setOpenAddTodoModel(true);
    };

    /*************************/

    const onError = (error: any) => {
        catchError(error);
    };
    const { mutate } = useDeleteTodo(onError, closeDeleteTodo);

    /*************************/

    /*{----------------------------------------------------------------------------------------------------------}*/

    const todoFn = () => {
        return getTodoList(profileId);
    };
    const on_Success = () => {
        //toast.success(`Refreshed todo (${data?.data.body.length})`);
    };
    const on_Error = (error: any) => {
        catchError(error);
    };

    // const { isLoading, data } = useReactQuery_Get(
      const { isLoading } = useReactQuery_Get(
          'get_todo_list',
          todoFn,
          on_Success,
          on_Error,
          true, // !fetch_On_Click_Status
          true, // refetch_On_Mount
          false, // refetch_On_Window_Focus
          false, // refetch_Interval
          false, // refetch_Interval_In_Background
          300000, // Cache time
          0, // Stale Time
      );
    // data?.data?.body?
    let listData = [
        {
            id: '1',
            subject: 'Car Wash',
            statement: 'Have to wash car before week end',
            status: 'NEW',
            updated_at: '2024-02-22T15:09:34.261',
            targetedCompletion: '2024-02-22T15:09:34.261',
        },
        {
            id: '1',
            subject: 'Car Wash',
            statement: 'Have to wash car before week end',
            status: 'NEW',
            updated_at: '2024-02-22T15:09:34.261',
            targetedCompletion: '2024-02-22T15:09:34.261',
        },
        {
            id: '1',
            subject: 'Car Wash',
            statement: 'Have to wash car before week end',
            status: 'NEW',
            updated_at: '2024-02-22T15:09:34.261',
            targetedCompletion: '2024-02-22T15:09:34.261',
        },
        {
            id: '1',
            subject: 'Car Wash',
            statement: 'Have to wash car before week end',
            status: 'NEW',
            updated_at: '2024-02-22T15:09:34.261',
            targetedCompletion: '2024-02-22T15:09:34.261',
        },
        {
            id: '1',
            subject: 'Car Wash',
            statement: 'Have to wash car before week end',
            status: 'NEW',
            updated_at: '2024-02-22T15:09:34.261',
            targetedCompletion: '2024-02-22T15:09:34.261',
        },
        {
            id: '1',
            subject: 'Car Wash',
            statement: 'Have to wash car before week end',
            status: 'NEW',
            updated_at: '2024-02-22T15:09:34.261',
            targetedCompletion: '2024-02-22T15:09:34.261',
        },
        {
            id: '1',
            subject: 'Car Wash',
            statement: 'Have to wash car before week end',
            status: 'NEW',
            updated_at: '2024-02-22T15:09:34.261',
            targetedCompletion: '2024-02-22T15:09:34.261',
        },
        {
            id: '1',
            subject: 'Car Wash',
            statement: 'Have to wash car before week end',
            status: 'NEW',
            updated_at: '2024-02-22T15:09:34.261',
            targetedCompletion: '2024-02-22T15:09:34.261',
        },
        {
            id: '1',
            subject: 'Car Wash',
            statement: 'Have to wash car before week end',
            status: 'NEW',
            updated_at: '2024-02-22T15:09:34.261',
            targetedCompletion: '2024-02-22T15:09:34.261',
        },
    ];

    /*{----------------------------------------------------------------------------------------------------------}*/

    return (
        <div className="todoListWrapper">
            {isLoading && (
                <div className="todoListWrapper_isLoading">
                    <LoadingFade />
                </div>
            )}
            {!isLoading && (
                <motion.div
                    whileHover={{ scale: 0.99 }}
                    whileTap={{ scale: 0.95 }}
                    className="todoListWrapper_add_new"
                    onClick={() => openAddTodo()}
                >
                    <IconContext.Provider
                        value={{
                            size: '2.5em',
                        }}
                    >
                        <FcPlus />
                    </IconContext.Provider>
                    &nbsp; Click here to add new task
                </motion.div>
            )}

            {!isLoading &&
                listData?.map((el: any) => (
                    <TodoListBox
                        key={el.id}
                        subject={el.subject}
                        description={el.statement}
                        id={el.id}
                        status={el.status}
                        updated={el.updated_at}
                        targetedCompletion={el.targetedCompletion}
                        openDeleteTodo={openDeleteTodo}
                        openChangeStatus={() =>
                            openChangeStatus(el.id, el.status)
                        }
                        openEditTodo={() => openEditTodo(el.id)}
                    />
                ))}

            {/***********************************BACKDROP*********************************/}

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {openDeleteTodoModel && (
                    <ConfirmationBackdropModel
                        backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)"
                        foregroundColor="rgb(21, 26, 30)"
                        handleClose={closeDeleteTodo}
                        text="You want to delete this item, Are you sure?"
                        btn_text="Delete"
                        setConfirmation={() => mutate(idToBeDeleted)}
                    />
                )}
            </AnimatePresence>

            {/* ******** */}

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {openEditTodoModel && (
                    <TodoListEditBackdrop
                        handleClose={closeEditTodo}
                        backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)"
                        foregroundColor="rgb(21, 26, 30)"
                        todoId={idToBeUpdatedStatus}
                    />
                )}
            </AnimatePresence>

            {/* ******* */}

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {openAddTodoModel && (
                    <WindowBackdropModel
                        backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)"
                        foregroundColor="rgb(21, 26, 30)"
                        handleClose={closeAddTodo}
                    >
                        <TodoListBoxAddingBackdrop closeFn={closeAddTodo} />
                    </WindowBackdropModel>
                )}
            </AnimatePresence>

            {/* ******* */}

            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {openChangeStatusModel && (
                    <TodoListStatusChangeBackdrop
                        handleClose={closeChangeStatus}
                        backgroundColor="linear-gradient(69.5deg, rgba(189, 73, 255, 0.5) 18.6%, rgb(254, 76, 227,0.5) 85.9%)"
                        foregroundColor="rgb(21, 26, 30)"
                        status={statusToBeUpdated}
                        todoId={idToBeUpdatedStatus}
                    />
                )}
            </AnimatePresence>

            {/***********************************BACKDROP*********************************/}
        </div>
    );
};

export default TodoListWrapper;
