import ProfileCard from './ProfileCard/ProfileCard';
import './Grid.css';
import { FaFaceGrinTongueWink } from 'react-icons/fa6';
import { FaFaceGrinWink } from 'react-icons/fa6';
import { FaFaceKiss } from 'react-icons/fa6';
import { FaFaceLaughBeam } from 'react-icons/fa6';
import { FaFaceRollingEyes } from 'react-icons/fa6';
import { FaFaceLaughWink } from 'react-icons/fa6';
import { FaFaceSadTear } from 'react-icons/fa6';
import { FaFaceGrinSquintTears } from 'react-icons/fa6';
import { FaFaceSurprise } from 'react-icons/fa6';

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
        <div className="grid-profile">
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
