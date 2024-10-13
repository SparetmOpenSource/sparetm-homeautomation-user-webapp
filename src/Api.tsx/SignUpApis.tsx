import { RootUrl } from "./Axios";

export const authUrl = {
    app_registration: `${RootUrl.gateway}/msa/api/v1/auth/register`,
    app_login: `${RootUrl.gateway}/msa/api/v1/auth/authenticate`,
    app_refresh_token: `${RootUrl.gateway}/msa/api/v1/auth/refresh-token`,
};