import './SelectProfile.css';
import { Link, useOutletContext } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { catchError, getAppAdminUser } from '../../../Utils/HelperFn';
import { getProfiles } from '../../../Api.tsx/ProfileConfigApis';
import { useReactQuery_Get } from '../../../Api.tsx/useReactQuery_Get';
import LoadingFade from '../../Others/LoadingAnimation/LoadingFade';
import ProfileCard from './ProfileCard/ProfileCard';
import { RoutePath } from '../../../Data/Constants';

const SelectProfile = () => {
  const ColorValue: any = useOutletContext();
  const appUser = getAppAdminUser();
  let dataArr: any[] = [];

  /*{----------------------------------------------------------------------------------------------------------}*/
  
    const profileFn = () => {
      return getProfiles(appUser);
    };
    const on_Success = () => {
    };
  const on_Error = (error: any) => {
       catchError(error);
    };

  const { isLoading, data:profileArr } = useReactQuery_Get(
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
    
  if (profileArr) {
    dataArr = profileArr?.data?.body;
  } else {
    dataArr = [{
      profileId: '1',
      profileName: appUser,
      roomCount: '5',
      updatedAt:'24-02-2024'
    }]
  }

    return (
        <div
            className="selectProfile"
        // style={{ background: ColorValue + '80' }}
          style={{ background: 'rgb(37,41,45)' }}
        >
            <div className="selectProfile_search">
                <input
                    type="text"
                    placeholder="Search with profile name..."
                />
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
                                col={ColorValue}
                            />
                        ))}
                    </div>
                )}
                {!isLoading && dataArr?.length === 0 && (
                    <div className="selectProfile_wrapper_loaded_empty">
                        <h1 style={{ color: 'red' }}>No profile found</h1>
                        <p>
                            Please click on{' '}
                             <Link to={RoutePath.AddProfileConfig}><span className="selectProfile_wrapper_loaded_empty_link">ADD</span></Link> button to
                            create profile
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectProfile;
