import {
    add,
    differenceInDays,
    endOfMonth,
    format,
    setDate,
    startOfMonth,
    sub,
} from 'date-fns';
import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md';
import { RiArrowDropLeftFill, RiArrowDropRightFill } from 'react-icons/ri';

import './Calendar.css';
import Cell from './Cell';

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = ({ value = new Date(), onChange }: any) => {
    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;

    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const prevMonth = () => onChange(sub(value, { months: 1 }));
    const nextMonth = () => onChange(add(value, { months: 1 }));
    const prevYear = () => onChange(sub(value, { years: 1 }));
    const nextYear = () => onChange(add(value, { years: 1 }));

    const handleClickDate = (index: number) => {
        const date = setDate(value, index);
        onChange(date);
    };

    return (
        <div className="calendar">
            <div className="calendar_header">
                <span>{format(value, 'LLLL yyyy')}</span>
                <span>
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevYear}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: 'black',
                            }}
                        >
                            <MdOutlineArrowLeft />
                        </IconContext.Provider>
                    </motion.span>
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevMonth}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: 'black',
                            }}
                        >
                            <RiArrowDropLeftFill />
                        </IconContext.Provider>
                    </motion.span>
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextMonth}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: 'black',
                            }}
                        >
                            <RiArrowDropRightFill />
                        </IconContext.Provider>
                    </motion.span>
                    <motion.span
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextYear}
                    >
                        <IconContext.Provider
                            value={{
                                size: '2em',
                                color: 'black',
                            }}
                        >
                            <MdOutlineArrowRight />
                        </IconContext.Provider>
                    </motion.span>
                </span>
            </div>
            <div className="calendar_content">
                {weeks.map((week, index) => (
                    <div key={index} className="calendar_content_day">
                        <strong>{week}</strong>
                    </div>
                ))}

                {Array.from({ length: prefixDays }).map((_, index) => (
                    <Cell key={index} />
                ))}

                {Array.from({ length: numDays }).map((_, index) => {
                    const date = index + 1;
                    const isCurrentDate = date === value.getDate();

                    return (
                        <Cell
                            key={date}
                            isActive={isCurrentDate}
                            onClick={() => handleClickDate(date)}
                        >
                            {date}
                        </Cell>
                    );
                })}

                {Array.from({ length: suffixDays }).map((_, index) => (
                    <Cell key={index} />
                ))}
            </div>
        </div>
    );
};

export default Calendar;
