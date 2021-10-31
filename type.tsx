interface IFeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

interface ITemp {
  day: number;
  eve: number;
  max: number;
  min: number;
  morn: number;
  night: number;
}

interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IDaily {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: IFeelsLike;
  humidity: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  rain: number;
  sunrise: number;
  sunset: number;
  temp: ITemp;
  uvi: number;
  weather: IWeather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}
