/**
 * FAANG-Standard Interface for OpenWeather-style Data
 */
export interface WeatherData {
    main: {
        temp: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
        pressure: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    name: string;
    sys: {
        country: string;
    };
    wind: {
        speed: number;
        deg: number;
    };
}

export interface WeatherExpandProps {
    weather: WeatherData;
    darkTheme: boolean;
    state: string;
}
