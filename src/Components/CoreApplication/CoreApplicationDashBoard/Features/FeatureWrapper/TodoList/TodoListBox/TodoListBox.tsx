import './TodoListBox.css';
import { IconContext } from 'react-icons';
import { FiEdit2 } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCalendar2Check } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { todoStatus } from '../../../../../../../Data/Enum';

const TodoListBox = (props: any) => {
    const comp_status: number =
        props.targetedCompletion !== '' ? props.targetedCompletion : 0;
    const comp_status_col =
        comp_status <= 50
            ? 'rgb(0, 128, 0,0.2)'
            : comp_status >= 50 && comp_status <= 80
            ? 'rgb(255, 69, 0,0.2)'
            : 'rgb(255, 0, 0, 0.2)';

    return (
        <motion.div
            whileHover={{ scale: 0.99 }}
            className="schedular_tap"
            style={{
                borderLeft: `5px solid ${
                    props.status === todoStatus[0]
                        ? 'green'
                        : props.status === todoStatus[1]
                        ? 'orangered'
                        : 'white'
                }`,
            }}
        >
            <span
                className="schedular_tap_comp_status"
                style={{
                    width: `${comp_status}%`,
                    background:
                        comp_status === 0 ? 'none' : `${comp_status_col}`,
                    color: 'rgb(255,255,255,0.1)',
                    transition: '2s all ease',
                }}
            >
                {comp_status >= 5 ? `${comp_status}%` : ''}
            </span>
            <span className="schedular_tap_col_1">
                <h1>
                    {props.status === todoStatus[2] ? (
                        <s>
                            {props.subject && props.updated
                                ? `${props.subject} (${
                                      props.updated.split('T')[0]
                                  })`
                                : 'unknown'}
                        </s>
                    ) : props.subject && props.updated ? (
                        `${props.subject} (${props.updated.split('T')[0]})`
                    ) : (
                        'unknown'
                    )}
                </h1>
                <p>
                    {props.status === todoStatus[2] ? (
                        <s>
                            {props.description ? props.description : 'unknown'}
                        </s>
                    ) : props.description ? (
                        props.description
                    ) : (
                        'unknown'
                    )}
                </p>
            </span>
            <span className="schedular_tap_col_2">
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => props.openChangeStatus(props.id)}
                >
                    <IconContext.Provider
                        value={{
                            size: '1.5em',
                            color: 'lavender',
                        }}
                    >
                        <BsCalendar2Check />
                    </IconContext.Provider>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => props.openEditTodo(props.id)}
                >
                    <IconContext.Provider
                        value={{
                            size: '1.5em',
                            color: 'lavender',
                        }}
                    >
                        <FiEdit2 />
                    </IconContext.Provider>
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => props.openDeleteTodo(props.id)}
                >
                    <IconContext.Provider
                        value={{
                            size: '1.7em',
                            color: 'lavender',
                        }}
                    >
                        <AiOutlineDelete />
                    </IconContext.Provider>
                </motion.div>
            </span>
        </motion.div>
    );
};

export default TodoListBox;
