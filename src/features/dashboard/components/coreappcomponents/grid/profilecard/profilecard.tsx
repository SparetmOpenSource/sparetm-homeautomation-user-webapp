import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../../../core/router/Themeprovider';
import { useAppDispatch } from '../../../../../../core/store/Reduxhooks';
import { dark_colors, light_colors } from '../../../../../../data/ColorConstant';
import { openProfileOnClick } from '../../../../../profile/utils/Profileconfighelperfn';
import './Profilecard.css';

const ProfileCard = ({
    profileId,
    profileName,
    roomCount,
    deviceCount,
    face,
}: any) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const handleClick = (profileId: any, profileName: any) => {
        openProfileOnClick(
            profileName,
            profileId,
            dispatch,
            queryClient,
            navigate,
        );
    };

    const [color, setColor] = useState<any>(light_colors);
    const darkTheme: any = useTheme();

    useEffect(() => {
        darkTheme ? setColor(dark_colors) : setColor(light_colors);
    }, [darkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.0 }}
            className="profileCard"
            onClick={() => {
                handleClick(profileId, profileName);
            }}
            style={{ backgroundColor: color?.border }}
        >
            <div className="profileCard-container">
                <span className="profileCard-container-icon">
                    <IconContext.Provider
                        value={{ size: '3em', color: color?.button }}
                    >
                        <span>{face}</span>
                    </IconContext.Provider>
                </span>
                <section
                    className="profileCard-container-row-1"
                    style={{ backgroundColor: color?.outer }}
                ></section>
                <section
                    className="profileCard-container-row-2"
                    style={{ backgroundColor: color?.inner }}
                >
                    <span className="profileCard-container-row-2-name">
                        <p style={{ fontSize: '16px', color: color?.text }}>
                            {profileName}
                        </p>
                    </span>
                    <span
                        className="profileCard-container-row-2-info"
                        style={{ borderTop: `1px solid ${color?.button}` }}
                    >
                        <span>
                            <p style={{ fontSize: '13px', color: color?.text }}>
                                {roomCount}
                            </p>
                            <p style={{ fontSize: '10px', color: color?.text }}>
                                Rooms
                            </p>
                        </span>
                        <span>
                            <p style={{ fontSize: '13px', color: color?.text }}>
                                {deviceCount}
                            </p>
                            <p style={{ fontSize: '10px', color: color?.text }}>
                                Device
                            </p>
                        </span>
                    </span>
                </section>
            </div>
        </motion.div>
    );
};

export default ProfileCard;
