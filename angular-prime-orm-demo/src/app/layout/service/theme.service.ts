import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {

    constructor(@Inject(DOCUMENT) private document: Document) {}

    switchTheme(theme: string) {
        let themeLink = this.document.getElementById('theme-css') as HTMLLinkElement;

        console.log('THEME: ' + theme);
        if (themeLink) {
            themeLink.href = theme + '.css';
        }
    }
}
