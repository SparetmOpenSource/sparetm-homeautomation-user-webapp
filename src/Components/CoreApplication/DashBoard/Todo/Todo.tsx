import { useEffect, useState } from 'react';
import './Todo.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useBackDropOpen, useTheme } from '../../../../Pages/ThemeProvider';
import TodoListTemp from './TodoListTemp/TodoListTemp';
import { IoIosAddCircle } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { motion } from 'framer-motion';
import { ADD_TODO_LIST, LandscapeSizeM } from '../../../../Data/Constants';

const Todo = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    const { toggleBackDropOpen } = useBackDropOpen();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="todo">
            <section
                className="todo-list-wrapper"
                style={{ backgroundColor: color?.element }}
            >
                <div className="todo-list-wrapper-header">
                    <div
                        style={{
                            backgroundColor: `${
                                color?.button.split(')')[0]
                            },0.6)`,
                            color: color?.text,
                        }}
                    >
                        <p>Date: 23-05-2025</p>
                    </div>
                    <div
                        style={{
                            backgroundColor: `${
                                color?.button.split(')')[0]
                            },0.6)`,
                            color: color?.text,
                        }}
                    >
                        <p>Count: 89</p>
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                const backdropId = ADD_TODO_LIST;
                                toggleBackDropOpen(
                                    backdropId,
                                    <div style={{ backgroundColor: 'white' }}>
                                        Add
                                    </div>,
                                    LandscapeSizeM,
                                );
                            }}
                        >
                            <IconContext.Provider value={{ size: '2em' }}>
                                <IoIosAddCircle />
                            </IconContext.Provider>
                        </motion.span>
                    </div>
                </div>
                {/* ************** */}
                <TodoListTemp />
                <TodoListTemp />
                <TodoListTemp />
                <TodoListTemp />
                <TodoListTemp />
                <TodoListTemp />
                <TodoListTemp />
                <TodoListTemp />
                <TodoListTemp />
                {/* ************** */}
            </section>
        </div>
    );
};

export default Todo;
