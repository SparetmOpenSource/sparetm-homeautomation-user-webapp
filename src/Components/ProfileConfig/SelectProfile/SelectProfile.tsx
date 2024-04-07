import './SelectProfile.css';
import { Link, useLocation, useOutletContext } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { catchError } from '../../../Utils/HelperFn';
import { getProfiles } from '../../../Api.tsx/ProfileConfigApis';
import { useReactQuery_Get } from '../../../Api.tsx/useReactQuery_Get';
import LoadingFade from '../../Others/LoadingAnimation/LoadingFade';
import ProfileCard from './ProfileCard/ProfileCard';
import { APPPROFILEKEY, RoutePath } from '../../../Data/Constants';

// -----------------------Profile face functions-----------------------//
import { FaFaceGrinTongueWink } from 'react-icons/fa6';
import { FaFaceGrinWink } from 'react-icons/fa6';
import { FaFaceKiss } from 'react-icons/fa6';
import { FaFaceLaughBeam } from 'react-icons/fa6';
import { FaFaceRollingEyes } from 'react-icons/fa6';
import { FaFaceLaughWink } from 'react-icons/fa6';
import { FaFaceSadTear } from 'react-icons/fa6';
import { FaFaceGrinSquintTears } from 'react-icons/fa6';
import { FaFaceSurprise } from 'react-icons/fa6';
import { APPPROFILE } from '../../../Data/Enum';
import jsonApiResponse from './../../../Data/SampleApiResponse.json';
import { getAppAdminUser } from '../../../Utils/ProfileConfigHelperFn';
import { useEffect } from 'react';
import { PROFILE_COLOR } from '../../../Data/ColorConstant';

const SelectProfile = () => {
    const location = useLocation();
    const [colorValue, setBackgroundColor]: any = useOutletContext();
    const appUser = getAppAdminUser();
    let dataArr: any[] = [];

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

    /*{----------------------------------------------------------------------------------------------------------}*/

    const profileFn = () => {
        return getProfiles(appUser);
    };
    const on_Success = () => {};
    const on_Error = (error: any) => {
        catchError(error);
    };

    const { isLoading, data: profileArr } = useReactQuery_Get(
        'select_profile',
        profileFn,
        on_Success,
        on_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    if (localStorage.getItem(APPPROFILEKEY) === APPPROFILE.STATUSON) {
        dataArr = profileArr?.data?.body;
    } else {
        dataArr = jsonApiResponse?.select_profile?.body;
    }

    useEffect(() => {
        if (location?.pathname === RoutePath.SelectProfileConfig) {
            setBackgroundColor(PROFILE_COLOR.OUTER);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            className="selectProfile"
            style={{ background: colorValue + '25' }}
        >
            <div className="selectProfile_search">
                <input type="text" placeholder="Search with profile name..." />
            </div>
            <div className="selectProfile_wrapper">
                {isLoading && (
                    <div className="selectProfile_wrapper_isLoading">
                        <LoadingFade />
                    </div>
                )}
                {!isLoading && dataArr?.length !== 0 && (
                    <div className="selectProfile_wrapper_loaded">
                        {dataArr?.map((el: any) => (
                            <ProfileCard
                                key={el.profileId}
                                profileId={el.profileId}
                                profileName={el.profileName}
                                roomCount={el.roomCount}
                                updatedAt={el.updatedAt}
                                deviceCount={el.deviceCount}
                                face={
                                    faceArr[
                                        Math.floor(
                                            Math.random() * faceArr.length,
                                        )
                                    ]
                                }
                                col={colorValue}
                            />
                        ))}
                    </div>
                )}
                {!isLoading && dataArr?.length === 0 && (
                    <div className="selectProfile_wrapper_loaded_empty">
                        <h1 style={{ color: 'red' }}>No profile found</h1>
                        <p>
                            Please click on{' '}
                            <Link to={RoutePath.AddProfileConfig}>
                                <span className="selectProfile_wrapper_loaded_empty_link">
                                    ADD
                                </span>
                            </Link>{' '}
                            button to create profile
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectProfile;
