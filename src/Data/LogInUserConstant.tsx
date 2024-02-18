import { RootUrl } from "./Constants";

export const Url = {
    user_registration_url: RootUrl.authMS + '/api/v1/users/create',
    user_login_url: RootUrl.authMS + '/api/v1/users/authenticate',
};

export const LogInCredLength = {
    userName: {
        min: 2,
        max: 16
    },
    password: {
        min: 8,
        max: 16
    }
}

export const RegistrationCredLength = {
    userName: {
        min: 2,
        max: 16
    },
    password: {
        min: 8,
        max: 16
    },
    fullName: {
        min: 2,
        max: 26
    }
}
