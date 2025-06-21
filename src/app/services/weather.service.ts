import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface WeatherResponse {
  current: CurrentWeather;
  daily: DailyForecast;
}

export interface CurrentWeather {
  temperature_2m: number;
  weather_code: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  wind_speed_10m: number;
  is_day: number;
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  apparent_temperature_max: number[];
  apparent_temperature_min: number[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
}

export interface GeocodingResponse {
  city: string;
}

export interface ForwardGeocodingResponse {
  results: GeolocationResult[];
}

export interface GeolocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly weatherApiUrl = 'https://api.open-meteo.com/v1/forecast';
  private readonly reverseGeocodingApiUrl = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
  private readonly forwardGeocodingApiUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  constructor(private http: HttpClient) { }

  getWeather(latitude: number, longitude: number): Observable<WeatherResponse> {
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,is_day',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max',
      timezone: 'Europe/Berlin'
    };
    return this.http.get<WeatherResponse>(this.weatherApiUrl, { params });
  }

  getCityName(latitude: number, longitude: number): Observable<GeocodingResponse> {
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      localityLanguage: 'pl'
    };
    return this.http.get<GeocodingResponse>(this.reverseGeocodingApiUrl, { params });
  }

  getCoordinatesByCityName(cityName: string): Observable<ForwardGeocodingResponse> {
    const params = {
      name: cityName,
      count: '5',
      language: 'pl',
      format: 'json'
    };
    return this.http.get<ForwardGeocodingResponse>(this.forwardGeocodingApiUrl, { params });
  }
}
