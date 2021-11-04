interface IFeelsLike {
  day: number;
  eve: number;
  morn: number;
  night: number;
}

export interface ITemp {
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

export interface IMeasearResult {
  coValue: string;
  msrstnName: string;
  msurDt: string;
  no2Value: string;
  o3Value: string;
  pm10Value: string;
  pm25Value: string;
  so2Value: string;
}

export interface ICurrentAir {
  coFlag: string;
  coGrade: string;
  coValue: string;
  dataTime: string;
  khaiGrade: string;
  khaiValue: string;
  no2Flag: string;
  no2Grade: string;
  no2Value: string;
  o3Flag: string;
  o3Grade: string;
  o3Value: string;
  pm10Flag: string;
  pm10Grade: string;
  pm10Value: string;
  pm25Flag: string;
  pm25Grade: string;
  pm25Value: string;
  so2Flag: string;
  so2Grade: string;
  so2Value: string;
}
