import {Injectable, Injector} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppInjector {

  private static injector: Injector;

  static setInjector = (injector: Injector) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>> AppInjector initialized', injector);
    AppInjector.injector = injector;
  }

  static getInjector(): Injector {
    console.log('<<<<<< AppInjector', AppInjector.injector);
    return AppInjector.injector;
  }
}
