import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { DailyForecast, WeatherResponse, WeatherService, GeolocationResult } from '../services/weather.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { Geolocation } from '@capacitor/geolocation';
import { Animation, AnimationController, ToastController, IonSearchbar } from '@ionic/angular';

export interface DailyForecastViewModel {
  date: string;
  tempMax: number;
  tempMin: number;
  weatherCode: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('weatherCard', { read: ElementRef }) weatherCard!: ElementRef;
  @ViewChild('forecastList', { read: ElementRef }) forecastList!: ElementRef;
  @ViewChild('searchbar') searchbar!: IonSearchbar;

  public searchResults: GeolocationResult[] = [];
  public weatherData$!: Observable<WeatherResponse & { dailyForecast: DailyForecastViewModel[] }>;
  public loading = true;
  public locationName = 'Ładowanie...';
  private cardAnimation!: Animation;
  private listAnimation!: Animation;
  private searchSubject = new Subject<string>();
  private searchSubscription!: Subscription;

  constructor(
    private weatherService: WeatherService,
    private animationCtrl: AnimationController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadWeather();
    this.searchSubscription = this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(term => term.length > 2),
        switchMap(searchTerm => this.weatherService.getCoordinatesByCityName(searchTerm))
      )
      .subscribe(data => {
        this.searchResults = data.results || [];
      });
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  async loadWeather() {
    this.loading = true;
    this.clearSearchResults();
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      
      const lat = coordinates.coords.latitude;
      const lon = coordinates.coords.longitude;

      this.weatherService.getCityName(lat, lon).subscribe(geo => {
        this.locationName = geo.city;
      });

      this.fetchWeather(lat, lon);
    } catch (error) {
      console.error('Error getting location, falling back to default', error);
      this.locationName = 'Warszawa (domyślnie)';
      this.fetchWeather(52.23, 21.01); // Fallback to Warsaw
    }
  }

  handleSearch(event: any) {
    const searchTerm = event.detail.value;
    if (searchTerm.trim() === '') {
      this.searchResults = [];
    }
    this.searchSubject.next(searchTerm);
  }

  selectCity(city: GeolocationResult) {
    let name = city.name;
    if (city.admin1) {
      name += ` (${city.admin1})`;
    }
    this.locationName = `${name}, ${city.country}`;
    this.fetchWeather(city.latitude, city.longitude);
    this.clearSearchResults();
    this.searchbar.value = '';
  }

  clearSearchResults() {
    this.searchResults = [];
  }

  private async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  private fetchWeather(lat: number, lon: number) {
    this.loading = true;
    this.weatherData$ = this.weatherService.getWeather(lat, lon).pipe(
      map(data => ({
        ...data,
        dailyForecast: this.transformDailyForecast(data.daily)
      })),
      map(data => {
        this.loading = false;
        setTimeout(() => this.animateIn(), 0);
        return data;
      })
    );
  }

  private animateIn() {
    this.cardAnimation = this.animationCtrl
      .create()
      .addElement(this.weatherCard.nativeElement)
      .duration(500)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(20px)', 'translateY(0)');

    this.listAnimation = this.animationCtrl
      .create()
      .addElement(this.forecastList.nativeElement)
      .duration(500)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(20px)', 'translateY(0)');

    this.cardAnimation.play().then(() => this.listAnimation.play());
  }

  private transformDailyForecast(daily: DailyForecast): DailyForecastViewModel[] {
    return daily.time.map((date, index) => ({
      date,
      tempMax: daily.temperature_2m_max[index],
      tempMin: daily.temperature_2m_min[index],
      weatherCode: daily.weather_code[index]
    }));
  }
}
