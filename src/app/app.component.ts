import { Component } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { StatusBar, Style } from '@capacitor/status-bar';
import { IonicModule, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {
  constructor(private platform: Platform) {
    registerLocaleData(localePl);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Listener for theme changes to update status bar
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        this.setStatusBar(event.matches ? Style.Dark : Style.Light);
      });

      // Set initial status bar style
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setStatusBar(prefersDark ? Style.Dark : Style.Light);
    });
  }

  setStatusBar(style: Style) {
    StatusBar.setStyle({ style });
  }
}
