import { FaFaceGrinSquintTears, FaFaceGrinTongueWink, FaFaceGrinWink, FaFaceKiss, FaFaceLaughBeam, FaFaceLaughWink, FaFaceRollingEyes, FaFaceSadTear, FaFaceSurprise } from 'react-icons/fa6';
import './grid.css';
import ProfileCard from './profilecard/profilecard';

const ProfileGrid = (props: any) => {
    let faceArr: any[] = [
        <FaFaceGrinTongueWink />,
        <FaFaceGrinWink />,
        <FaFaceKiss />,
        <FaFaceLaughBeam />,
        <FaFaceRollingEyes />,
        <FaFaceLaughWink />,
        <FaFaceSadTear />,
        <FaFaceGrinSquintTears />,
        <FaFaceSurprise />,
    ];

    return (
        <div className="profile-grid">
            {props?.data?.map((el: any) => (
                <ProfileCard
                    key={el.profileId}
                    profileId={el.profileId}
                    profileName={el.profileName}
                    roomCount={el.roomCount}
                    deviceCount={el.deviceCount}
                    face={faceArr[Math.floor(Math.random() * faceArr.length)]}
                />
            ))}
        </div>
    );
};

export default ProfileGrid;
