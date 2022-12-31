import { useOutletContext } from 'react-router-dom';
import FormToAddProfile from '../FormToAddProfile/FormToAddProfile';
import ProfileAvatar from './../../../Assets/ProfileAvatar.svg';
import './AddProfile.css';

const AddProfile = () => {
    const ColorValue: any = useOutletContext();
    return (
        <div className="addProfile">
            <section
                className="addProfile_avatar"
                style={{
                    background: ColorValue + '80',
                }}
            >
                <img
                    src={ProfileAvatar}
                    loading="lazy"
                    height="80%"
                    width="80%"
                    alt="landing_img"
                />
            </section>
            <section className="addProfile_form">
                <FormToAddProfile />
            </section>
        </div>
    );
};

export default AddProfile;
