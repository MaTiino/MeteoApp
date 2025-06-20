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
  iconName = 'sunny';

  constructor() {}

  ngOnChanges() {
    this.iconName = this.getIconName(this.weatherCode);
  }

  private getIconName(code: number): string {
    if (code >= 0 && code <= 1) return 'sunny';
    if (code === 2) return 'partly-sunny';
    if (code === 3) return 'cloud';
    if (code > 40 && code < 50) return 'rainy';
    if (code > 50 && code < 70) return 'rainy';
    if (code > 70 && code < 80) return 'snow';
    if (code > 90) return 'thunderstorm';
    return 'sunny';
  }
}
