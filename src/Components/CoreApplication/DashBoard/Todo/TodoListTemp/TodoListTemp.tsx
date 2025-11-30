import { useEffect, useState } from 'react';
import './TodoListTemp.css';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { LiaUserEditSolid } from 'react-icons/lia';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import { useBackDropOpen, useTheme } from '../../../../../Pages/ThemeProvider';
import { MdFileOpen } from 'react-icons/md';
import {
    DELETING_TODO_LIST,
    EDIT_TODO_LIST,
    HorizontalSize,
    LandscapeSizeS,
} from '../../../../../Data/Constants';
import Confirmation from '../../../../Others/BackDrop/Confirmation/Confirmation';
import Edit from './Edit/Edit';

const TodoListTemp = () => {
    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();
    const { toggleBackDropOpen, toggleBackDropClose } = useBackDropOpen();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.div
            whileHover={{ scale: 0.99 }}
            style={{ backgroundColor: color?.inner }}
            className="todo-list"
        >
            <span className="todo-list-msg">
                <h1 style={{ color: color?.text }}>Car wash</h1>
                <p style={{ color: color?.icon }}>
                    Please wash your car till end of this week
                </p>
            </span>
            <span
                className="todo-list-edit"
                style={{ borderLeft: `2px solid ${color?.text}` }}
            >
                <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        const backdropId = EDIT_TODO_LIST;
                        toggleBackDropOpen(
                            backdropId,
                            <Edit darkTheme={darkTheme} />,
                            HorizontalSize,
                        );
                    }}
                >
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: color?.button,
                        }}
                    >
                        <MdFileOpen />
                    </IconContext.Provider>
                </motion.span>
                <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        const backdropId = EDIT_TODO_LIST;
                        toggleBackDropOpen(
                            backdropId,
                            <Edit darkTheme={darkTheme} />,
                            HorizontalSize,
                        );
                    }}
                >
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: color?.button,
                        }}
                    >
                        <LiaUserEditSolid />
                    </IconContext.Provider>
                </motion.span>
                <motion.span
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        const backdropId = DELETING_TODO_LIST;
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
            </span>
        </motion.div>
    );
};

export default TodoListTemp;
