import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ConfigService, DEFAULT_CONFIG, DEFAULT_THEME } from './app.config.service';
import { NGXLogger } from 'ngx-logger';

export const THEME_LIGHT = DEFAULT_THEME;
export const THEME_DARK = 'vela-orange';

export const DARK_THEMES: string[] = [
  'vela-orange',
  'arya-orange',
  'bootstrap4-dark-purple'
];

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    constructor(
      @Inject(DOCUMENT) private document: Document,
      private configService: ConfigService,
      private logger: NGXLogger
    ) {
      // setting default theme
      const cfg = this.configService.getConfig();
      const theme = cfg.theme ? cfg.theme : DEFAULT_THEME;
      if (theme !== DEFAULT_CONFIG.theme) {
        this.switchTheme(theme);
      }
    }

    switchTheme(theme: string) {
      this.logger.debug('Switching to theme:' + theme);
      let themeLink = this.document.getElementById('theme-css') as HTMLLinkElement;
      if (themeLink) {
        themeLink.href = theme + '.css';
      }
      const cfg = this.configService.getConfig();
      cfg.theme = theme;
      cfg.dark = DARK_THEMES.includes(theme);
      this.configService.updateConfig(cfg);
    }

    switchToDefaultTheme(dark: boolean) {
      const theme = dark ? THEME_DARK : THEME_LIGHT;
      this.switchTheme(theme);
    }
}
