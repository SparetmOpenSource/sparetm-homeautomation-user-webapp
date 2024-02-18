import { Bounce,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { APPPROFILE, TOASTIFYCOLOR, TOASTIFYSTATE } from '../Data/Enum';
import { RoutePath } from '../Data/Constants';


// -----------------------Toastify functions-----------------------//

const toastProperty:any =(color:any)=> {
     return {position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: false,
progress: undefined,
theme: color, // light, dark, colored
transition: Bounce}
}

// status -> "info","success","warn","error"
export const displayToastify:any = (message: any,color:any,status:any) => {
   if(status === "info"){
    toast.info(message,toastProperty(color));
   }
      else if(status === "success"){
    toast.success(message,toastProperty(color));
   }
      else if(status === "warn"){
    toast.warn(message,toastProperty(color));
   }else{
     toast.error(message,toastProperty(color));
   }
};

// ---------------- Error inside catch -------------------- //

export const catchError=(error:any)=>{
        let errorDetails = (error as any)?.response?.data?.message;
        if (typeof errorDetails === 'object' && errorDetails !== null) {
            Object.keys(errorDetails).forEach(function eachKey(key) {
                displayToastify(errorDetails[key], TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.ERROR);
            });
        } else {
            if (errorDetails) {
                displayToastify(errorDetails, TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.ERROR);
            } else {
                displayToastify("Network Error", TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.ERROR);
            }
            
        }
}


// ----------------------- Set,Get,Remove JWT Token -------------------------//

export const setAccessToken = (response: any) => {
    const accessToken = response?.data?.token;
    localStorage.setItem('token', accessToken);
};
export const getAccessToken = () => {
    const accessToken = localStorage.getItem('token');
    return accessToken;
};
export const removeAccessToken = () => {
    localStorage.removeItem('token');
};

// ---------------------- setOfflineUser ------------------------- //

export const setAppProfile = (status: boolean) => {
  if (status === true) {
    localStorage.setItem('appProfile', APPPROFILE.STATUSOFF); 
  } else {
    localStorage.setItem('appProfile', APPPROFILE.STATUSON); 
  }
  let currentProfile = localStorage.getItem('appProfile');
  if (localStorage.getItem('appProfile') === APPPROFILE.STATUSOFF) {
    displayToastify(`${currentProfile?.charAt(0).toUpperCase()}${currentProfile?.slice(1)} mode ON`, TOASTIFYCOLOR.LIGHT, TOASTIFYSTATE.INFO);
  }
};

// export const setOfflineUser = (userName: any, password:any) => {
//   localStorage.setItem('offlineTestUserName', userName);
//   localStorage.setItem('offlineTestPassword', password);
// };

// export const getOfflineUser = () => {
//   const offlineTestUserName = localStorage.getItem('offlineTestUserName');
//   const offlineTestPassword = localStorage.getItem('offlineTestPassword');
//   const offlineCred = {
//     userName: offlineTestUserName,
//     password:offlineTestPassword
//   }
//     return offlineCred;
// };

// export const removeOfflineUser = () => {
//   localStorage.removeItem('offlineTestUserName');
//   localStorage.removeItem('offlineTestPassword');
// };

// Admin user
export const getAppAdminUser = () => {
    const adminUserName = localStorage.getItem('appUser');
    return adminUserName;
};

export const setAppAdminUser = (response: any) => {
    const adminUserName = response?.data?.userName;
    localStorage.setItem('appUser', adminUserName);
};

export const removeAppAdminUser = () => {
    localStorage.removeItem('appUser');
};

// Profile id
export const setProfileId = (profileId: any) => {
    localStorage.setItem('profileId', profileId);
};

export const getProfileId = () => {
    const profileName = localStorage.getItem('profileId');
    return profileName;
};

export const removeProfileId = () => {
    localStorage.removeItem('profileId');
};

// Profile name
export const setProfileName = (profileName: any) => {
    localStorage.setItem('profileName', profileName);
};

export const getProfileName = () => {
    const profileName = localStorage.getItem('profileName');
    return profileName;
};

export const removeProfileName = () => {
    localStorage.removeItem('profileName');
};


// Logout
export const logOut = (navigate: any) => {
  removeAccessToken();
  removeAppAdminUser();
  //removeOfflineUser();
    //removeProfileId();
    //removeCityCountryStateToken();
    //removeProfileName();
  navigate(RoutePath.Home);
};

// ------------------ Open profile on clicking on profile card -------------------------------- //

export const openProfileOnClick = (
  profileName: any,
  profileId: any,
  navigate: any,
) => {
  // if (displayToastify('Signing In', TOASTIFYCOLOR.DARK, TOASTIFYSTATE.INFO)) {
  //   displayToastify(`Signing In as ${profileName}`, TOASTIFYCOLOR.DARK, TOASTIFYSTATE.INFO)
  // } else {
  removeProfileId();
  removeProfileName();
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries();
  setProfileId(profileId);
  setProfileName(profileName);
  navigate(
    RoutePath.CoreApplication + '/dashboard/' + RoutePath.Dashboard_Todo,
  );
  // navigate(RoutePath.Dashboard_Todo);
  //removeCityCountryStateToken();
// }
};
 

