import { Component, Input, OnChanges } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-weather-icon',
  templateUrl: './weather-icon.component.html',
  styleUrls: ['./weather-icon.component.scss'],
  standalone: true,
  imports: [IonIcon],
})
export class WeatherIconComponent implements OnChanges {
  @Input() weatherCode!: number;
  @Input() isDay: boolean | number = 1; // Default to day
  @Input() isDailySummary = false;
  iconName = 'sunny-outline';

  constructor() {}

  ngOnChanges() {
    this.iconName = this.getIconName(this.weatherCode, this.isDay, this.isDailySummary);
  }

  private getIconName(code: number, isDay: boolean | number, isDaily: boolean): string {
    const isDayTime = isDay === 1 || isDay === true;

    // For the daily forecast summary, we want a simpler, more optimistic icon.
    // Codes 0, 1, and 2 (Clear, Mainly Clear, Partly Cloudy) should all be considered "Sunny".
    if (isDaily) {
      if (code >= 0 && code <= 2) return 'sunny-outline';
    }

    switch (code) {
      case 0: // Clear sky
        return isDayTime ? 'sunny-outline' : 'moon-outline';
      case 1: // Mainly clear
      case 2: // Partly cloudy
        return isDayTime ? 'partly-sunny-outline' : 'cloudy-night-outline';
      case 3: // Overcast
        return 'cloud-outline';
      case 45: // Fog
      case 48: // depositing rime fog
        return 'reorder-four-outline'; // Best representation for Fog
      case 51: // Drizzle
      case 53:
      case 55:
      case 56: // Freezing Drizzle
      case 57:
      case 61: // Rain
      case 63:
      case 65:
      case 66: // Freezing Rain
      case 67:
      case 80: // Showers
      case 81:
      case 82:
        return 'rainy-outline';
      case 71: // Snow
      case 73:
      case 75:
      case 77: // Snow grains
      case 85: // Snow Showers
      case 86:
        return 'snow-outline';
      case 95: // Thunderstorm
      case 96: // Thunderstorm with hail
      case 99:
        return 'thunderstorm-outline';
      default:
        return isDayTime ? 'sunny-outline' : 'moon-outline';
    }
  }
}
