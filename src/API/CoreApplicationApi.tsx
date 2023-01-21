import { api, config_1 } from "./Axios";

export const featureUrl = {
    get_weather_quote_1: '/mpa/api/v1/profiles/features?id=',
    get_weather_quote_2: '&data=weather&unit=metric&quotelimit=40',
};

/****************************************************************/

export const getWeatherQuote = async (profileId: any) => {
    return await api.get(
        featureUrl.get_weather_quote_1 +
            profileId +
            featureUrl.get_weather_quote_2,
        config_1,
    );
};
