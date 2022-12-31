import './SelectProfile.css';
import LoadingFade from '../../Others/LoadingAnimation/LoadingFade/LoadingFade';
import ProfileCard from '../ProfileCard/ProfileCard';
import { useOutletContext } from 'react-router-dom';

const SelectProfile = () => {
    const ColorValue: any = useOutletContext();
    const isLoading = false;
    return (
        <div
            className="selectProfile"
            style={{ background: ColorValue + '80' }}
        >
            <div className="selectProfile_search">
                <input
                    type="text"
                    placeholder="Search with profile name, city, country..."
                />
            </div>
            <div className="selectProfile_wrapper">
                {isLoading && (
                    <div className="selectProfile_wrapper_isLoading">
                        <LoadingFade />
                    </div>
                )}
                {!isLoading && (
                    <div className="selectProfile_wrapper_loaded">
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                        <ProfileCard col={ColorValue} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectProfile;
