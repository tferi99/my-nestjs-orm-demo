import {Injectable, Injector} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInjector {
  private static injector: Injector;

  static setInjector = (injector: Injector) => {
    AppInjector.injector = injector;
    console.log('Injector initialized');
  }

  static getInjector(): Injector {
    return AppInjector.injector;
  }
}
