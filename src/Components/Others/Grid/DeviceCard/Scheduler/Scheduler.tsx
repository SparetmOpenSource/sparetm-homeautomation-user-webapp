import React, { useEffect, useState, useCallback } from 'react';
import './Scheduler.css';
import { dark_colors, light_colors } from '../../../../../Data/ColorConstant';
import { IoMdTime } from 'react-icons/io';
import { MdDeleteOutline, MdPowerSettingsNew } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { displayToastify } from '../../../../../Utils/HelperFn';
import { getHeaderConfig } from '../../../../../Api.tsx/Axios';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../../../Data/Enum';
import { getDeviceSchedules, profileUrl } from '../../../../../Api.tsx/ProfileConfigApis';
import { useAppSelector } from '../../../../../Features/ReduxHooks';
import { useReactQuery_Get } from '../../../../../Api.tsx/useReactQuery_Get';
import { GET_DEVICE_SCHEDULES_QUERY_ID } from '../../../../../Data/QueryConstant';
import { useDeleteData, usePostUpdateData } from '../../../../../Api.tsx/useReactQuery_Update';

interface SchedulerProps {
    darkTheme: boolean;
    deviceId?: string;
}

interface Schedule {
    id: string;
    time: string;
    days: number[]; // 0-6 (Sun-Sat)
    action: 'ON' | 'OFF';
    isEnabled: boolean;
}

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Scheduler: React.FC<SchedulerProps> = ({ darkTheme, deviceId }) => {
    const [color, setColor] = useState<any>(light_colors);
    // Form State
    const [selectedTime, setSelectedTime] = useState('08:00');
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [selectedAction, setSelectedAction] = useState<'ON' | 'OFF'>('ON');
    const [isAddLoading, setIsAddLoading] = useState(false);

    // List State
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    const admin = useAppSelector((state: any) => state?.user?.admin);

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]);

    // --- React Query: Get Schedules ---
    const { refetch, isFetching } = useReactQuery_Get(
        GET_DEVICE_SCHEDULES_QUERY_ID,
        () => getDeviceSchedules(deviceId, darkTheme),
        (data: any) => {
            if (data && data.data) {
                 const sorted = data.data.sort((a: any, b: any) => a.time.localeCompare(b.time));
                 setSchedules(sorted);
            }
        },
        (error: any) => {
            console.error('Failed to fetch schedules', error);
        },
        !!deviceId, // enabled when deviceId is present
        true, // refetch on mount
        false, 
        false, 
        false, 
        300000, 
        0
    );

    // --- React Query: Add Schedule ---
    const { mutate: addScheduleMutation } = usePostUpdateData(
        profileUrl.add_schedule + admin,
        getHeaderConfig,
        () => {
             displayToastify('Schedule added successfully', darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.SUCCESS);
             setIsAddLoading(false);
             setSelectedDays([]); // Reset form
             refetch(); // Refresh list
        },
        (error: any) => {
             setIsAddLoading(false);
             // Error already handled in API wrapper or hook defaults
        }
    );

    // --- React Query: Delete Schedule ---
    const { mutate: deleteScheduleMutation } = useDeleteData(
        profileUrl.schedule + '/%id%',
        getHeaderConfig,
        () => {
             displayToastify('Schedule deleted', darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.INFO);
             refetch(); // Refresh list
        },
        (error: any) => {
             // Error handled
        }
    );

    const toggleDay = useCallback((index: number) => {
        setSelectedDays(prev => {
            if (prev.includes(index)) {
                return prev.filter((d) => d !== index);
            } else {
                return [...prev, index].sort();
            }
        });
    }, []);

    const handleAddSchedule = useCallback(() => {
        if (!selectedTime) {
            displayToastify('Please select a time', darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.INFO);
            return;
        }
        if (selectedDays.length === 0) {
            displayToastify('Select at least one day', darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.INFO);
            return;
        }
        if (!deviceId || !admin) {
             displayToastify('Missing device or admin info', darkTheme ? TOASTIFYCOLOR.DARK : TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.ERROR);
             return;
        }

        const newSchedule = {
            deviceId: deviceId,
            time: selectedTime,
            days: selectedDays,
            action: selectedAction,
            isEnabled: true,
        };

        setIsAddLoading(true);
        addScheduleMutation(newSchedule);

    }, [selectedTime, selectedDays, selectedAction, darkTheme, deviceId, admin, addScheduleMutation]);

    const deleteSchedule = useCallback((id: string) => {
        deleteScheduleMutation(id);
    }, [deleteScheduleMutation]);

    const getDayString = (days: number[]) => {
        if (days.length === 7) return 'Every day';
        if (days.length === 0) return 'No days'; 
        if (days.length === 5 && !days.includes(0) && !days.includes(6)) return 'Weekdays';
        if (days.length === 2 && days.includes(0) && days.includes(6)) return 'Weekends';
        
        return days.map(d => DAYS[d]).join(', ');
    };

    return (
        <div className="scheduler_container" style={{ backgroundColor: color?.element }}>
            <h2 className="scheduler_header" style={{ color: color?.text }}>Device Scheduler</h2>
            
            {/* Form Section */}
            <div className="scheduler_form" style={{ backgroundColor: darkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}>
                <div className="scheduler_time_row">
                    <input 
                        type="time" 
                        aria-label="Select Time"
                        className="scheduler_time_input"
                        style={{ color: color?.text, borderColor: color?.icon }}
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    />
                    
                    <motion.div 
                        role="button"
                        aria-label={`Toggle Action: Currently ${selectedAction}`}
                        className="scheduler_action_toggle"
                        style={{ 
                            backgroundColor: selectedAction === 'ON' ? color?.success : (color?.danger || '#ff4d4d'),
                            color: '#fff'
                        }}
                        onClick={() => setSelectedAction(prev => prev === 'ON' ? 'OFF' : 'ON')}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MdPowerSettingsNew />
                        {selectedAction}
                    </motion.div>
                </div>

                <div className="scheduler_days_row" role="group" aria-label="Select Days">
                    {DAYS.map((day, index) => (
                        <motion.button
                            key={index}
                            aria-label={`Select ${day}`}
                            aria-pressed={selectedDays.includes(index)}
                            className="scheduler_day_btn"
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleDay(index)}
                            style={{
                                backgroundColor: selectedDays.includes(index) ? color?.highlight : 'transparent',
                                color: selectedDays.includes(index) ? '#fff' : color?.text,
                                border: `1px solid ${selectedDays.includes(index) ? 'transparent' : color?.icon}`
                            }}
                        >
                            {day}
                        </motion.button>
                    ))}
                </div>

                <motion.button 
                    className="scheduler_add_btn"
                    aria-label="Add Schedule"
                    style={{ backgroundColor: color?.button, color: '#fff', opacity: isAddLoading ? 0.7 : 1, cursor: isAddLoading ? 'not-allowed' : 'pointer' }}
                    onClick={handleAddSchedule}
                    disabled={isAddLoading}
                    whileHover={{ opacity: 0.9 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {isAddLoading ? 'Adding...' : 'Add Schedule'}
                </motion.button>
            </div>

            {/* List Section */}
            <div className="scheduler_list" role="list">
                <AnimatePresence>
                    {schedules.map((schedule) => (
                        <motion.div 
                            key={schedule.id}
                            role="listitem"
                            className="scheduler_item"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            style={{ backgroundColor: darkTheme ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
                        >
                            <div className="scheduler_item_info">
                                <div className="scheduler_item_time" style={{ color: color?.text }}>
                                    <IoMdTime size={18} />
                                    {schedule.time}
                                    <span style={{ 
                                        fontSize: '0.8rem', 
                                        marginLeft: '0.5rem',
                                        color: schedule.action === 'ON' ? color?.success : (color?.danger || '#ff4d4d'),
                                        fontWeight: 'bold'
                                    }}>
                                        {schedule.action}
                                    </span>
                                </div>
                                <div className="scheduler_item_days" style={{ color: color?.text }}>
                                    {getDayString(schedule.days)}
                                </div>
                            </div>
                            
                            <div className="scheduler_item_actions">
                                <motion.button 
                                    className="scheduler_delete_btn"
                                    aria-label="Delete Schedule"
                                    onClick={() => deleteSchedule(schedule.id)}
                                    style={{ color: color?.icon }}
                                    whileHover={{ color: color?.danger, scale: 1.1 }}
                                >
                                    <MdDeleteOutline />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {schedules.length === 0 && (
                    <div style={{ textAlign: 'center', opacity: 0.5, fontSize: '0.9rem', color: color?.text, padding: '1rem' }}>
                        {isFetching ? 'Loading schedules...' : 'No schedules set'}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Scheduler;