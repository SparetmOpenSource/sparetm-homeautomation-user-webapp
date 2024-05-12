import { useLocation, useOutletContext } from 'react-router-dom';
import { getCityCountryStateToken } from '../../../Api.tsx/ProfileConfigApis';
import { useReactQuery_Get } from '../../../Api.tsx/useReactQuery_Get';
import { TOASTIFYCOLOR, TOASTIFYSTATE } from '../../../Data/Enum';
import { displayToastify } from '../../../Utils/HelperFn';
import LoadingFade from '../../Others/LoadingAnimation/LoadingFade';
import './AddProfile.css';
import FormToAddProfile from './FormToAddProfile/FormToAddProfile';
import { useEffect } from 'react';
import { PROFILE_COLOR } from '../../../Data/ColorConstant';
import { RoutePath } from '../../../Data/Constants';

const AddProfile = () => {
    const location = useLocation();

    const [colorValue, setBackgroundColor]: any = useOutletContext();
    const tokenFn = () => {
        return getCityCountryStateToken();
    };
    const on_token_Success = () => {
        //displayToastify(data?.data.auth_token, TOASTIFYCOLOR.DARK, TOASTIFYSTATE.INFO);
    };
    const on_token_Error = (error: any) => {
        displayToastify(
            error?.message,
            TOASTIFYCOLOR.LIGHT,
            TOASTIFYSTATE.ERROR,
        );
    };

    const { isLoading, data: tokenNumber } = useReactQuery_Get(
        'city_country_state_token',
        tokenFn,
        on_token_Success,
        on_token_Error,
        true, // !fetch_On_Click_Status
        true, // refetch_On_Mount
        false, // refetch_On_Window_Focus
        false, // refetch_Interval
        false, // refetch_Interval_In_Background
        300000, // Cache time
        0, // Stale Time
    );

    useEffect(() => {
        if (location?.pathname === RoutePath.AddProfileConfig) {
            setBackgroundColor(PROFILE_COLOR.OUTER);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="addProfile">
            <section>
                {isLoading && <LoadingFade />}
                {!isLoading && (
                    <FormToAddProfile
                        parentColorValue={colorValue}
                        token={tokenNumber?.data?.auth_token}
                    />
                )}
            </section>
        </div>
    );
};

export default AddProfile;
