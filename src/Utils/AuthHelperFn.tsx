// Get JWT Token
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
