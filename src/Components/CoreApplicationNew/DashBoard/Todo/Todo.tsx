import { useEffect, useState } from 'react';
import './Todo.css';
import { dark_colors, light_colors } from '../../../../Data/ColorConstant';
import { useBackDropOpen, useTheme } from '../../../../Pages/ThemeProvider';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { LiaUserEditSolid } from 'react-icons/lia';
import Confirmation from '../../../Others/BackDrop/Confirmation/Confirmation';
import {
    LandscapeSizeS,
    SPOTIFY_EXPAND_ALBUM_DELETE_CONFIRMATION,
    DELETING_TODOLIST,
} from '../../../../Data/Constants';

const Todo = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="todo">
            <section
                className="todo-list-wrapper"
                style={{ backgroundColor: color?.element }}
            >
                <motion.div
                    // whileHover={{ border: `1px solid ${color?.success}` }}
                    // whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ backgroundColor: color?.inner }}
                >
                    <span className="todo-list-msg">
                        <h1 style={{ color: color?.text }}>Car wash</h1>
                        <p style={{ color: color?.text }}>
                            Please wash your car till end of this week
                        </p>
                    </span>
                    <span
                        className="todo-list-edit"
                        style={{ borderLeft: `2px solid ${color?.button}` }}
                    >
                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                const backdropId = DELETING_TODOLIST; // Unique ID for this backdrop

                                toggleBackDropOpen(
                                    backdropId,
                                    <Confirmation
                                        darkTheme={darkTheme}
                                        heading="Would you like to delete this todo from your collection?"
                                        btnOkFn={() => {
                                            // triggerDeletion(docId);
                                            toggleBackDropClose(backdropId);
                                        }}
                                        btnCancelFn={() =>
                                            toggleBackDropClose(backdropId)
                                        }
                                        btnOkLabel="Yes, delete"
                                        btnCancelLabel="Cancel"
                                    />,
                                    LandscapeSizeS,
                                );
                            }}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: color?.button,
                                }}
                            >
                                <MdOutlineDeleteOutline />
                            </IconContext.Provider>
                        </motion.span>

                        <motion.span
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            //   onClick={() => navigate(todoListPath)}
                        >
                            <IconContext.Provider
                                value={{
                                    size: '2em',
                                    color: color?.element,
                                }}
                            >
                                <LiaUserEditSolid />
                            </IconContext.Provider>
                        </motion.span>
                    </span>
                </motion.div>
            </section>
        </div>
    );
};

export default Todo;
