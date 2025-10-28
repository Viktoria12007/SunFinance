export interface City {
    clouds: Record<string, number> | null,
    coord: {
        lat: number,
        lon: number
    };
    dt: number,
    id: number,
    main: Record<string, number>,
    name: string,
    rain: Record<string, number> | null,
    snow: Record<string, number> | null,
    sys: {
        country: string,
    };
    weather: Array<Record<string, string | number>>,
    wind: Record<string, number>,
}

export interface CityList {
    cod: string,
    count: number,
    list: Array<City>,
    message: string,
}

export interface CityForecastDetails {
    alerts: Array<Record<string, string | number>>,
    current: {
        clouds: number,
        dew_point: number,
        dt: number,
        feels_like: number,
        humidity: number,
        pressure: number,
        sunrise: number,
        sunset: number,
        temp: number,
        uvi: number,
        visibility: number,
        weather: Array<Record<string, string | number>>,
        win_deg: number,
        win_speed: number,
    };
    daily: Array<Record<string, any>>,
    hourly: Array<Record<string, string | number>>,
    lat: number,
    lon: number,
    minutely: Array<{ dt: number, precipitation: number }>,
    timezone: string,
    timezone_offset: number,
}
