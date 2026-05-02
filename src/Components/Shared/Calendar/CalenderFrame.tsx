import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import Calendar from './Calendar';
import { WiRefresh } from 'react-icons/wi';
import './Calendar.css';
import { format } from 'date-fns';

const CalenderFrame = ({ setNewDate }: any) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const handleSetToday = () => setCurrentDate(new Date());
    const selectedDate: any = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSS");
    useEffect(() => {
        setNewDate(selectedDate);
    }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className="calenderFrame">
            <div className="calenderFrame_reset">
                <p>
                    <strong>
                        {selectedDate.split('T')[0] ===
                        format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS").split(
                            'T',
                        )[0]
                            ? `Today's: `
                            : 'Selected: '}
                    </strong>
                    {selectedDate.split('T')[0]}
                </p>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSetToday()}
                >
                    <IconContext.Provider
                        value={{
                            size: '2em',
                            color: 'white',
                        }}
                    >
                        <span>
                            <WiRefresh />
                        </span>
                    </IconContext.Provider>
                </motion.div>
            </div>
            <div className="calenderFrame_content">
                <Calendar value={currentDate} onChange={setCurrentDate} />
            </div>
        </div>
    );
};

export default CalenderFrame;
