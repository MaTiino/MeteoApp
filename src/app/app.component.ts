import { Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(private platform: Platform) {}

  ngOnInit() {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Set the status bar style to match the app theme
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.setStatusBar(e.matches ? Style.Dark : Style.Light);
      });

      // Check the initial theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setStatusBar(prefersDark ? Style.Dark : Style.Light);
    });
  }

  setStatusBar(style: Style) {
    StatusBar.setStyle({ style });
  }
}
