import { motion } from 'framer-motion';
import { IconContext } from 'react-icons';
import './ProfileCard.css';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { openProfileOnClick } from '../../../Utils/AuthHelperFn';

const ProfileCard = (props: any) => {
    const navigate = useNavigate();
    const handleClick = (profileId: any) => {
         openProfileOnClick(profileId, navigate);
    };
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="profileCard"
            onClick={() => {
                handleClick(props.profileId);
            }}
        >
            <div className="profileCard_container">
                <span className="profileCard_container_icon">
                    <IconContext.Provider
                        value={{ size: '3em', color: props.col }}
                    >
                        <span>
                            <CgProfile />
                        </span>
                    </IconContext.Provider>
                </span>
                <section className="profileCard_container_row_1"></section>
                <section className="profileCard_container_row_2">
                    <span className="profileCard_container_row_2_name">
                        <p style={{ fontSize: '16px' }}>{props.profileName}</p>
                    </span>
                    <span className="profileCard_container_row_2_info">
                        <p style={{ fontSize: '24px', color: '#E2FF00' }}>56</p>
                        <p style={{ fontSize: '14px' }}>Devices</p>
                    </span>
                </section>
            </div>
        </motion.div>
    );
};

export default ProfileCard;
