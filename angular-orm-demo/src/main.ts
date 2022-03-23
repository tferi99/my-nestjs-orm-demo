import {enableProdMode, Injector} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {AppInjector} from './app/core/util/app-injector';
import {InitService} from './app/init/init.service';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then((moduleRef) => AppInjector.setInjector(moduleRef.injector))
  .catch(err => console.error(err));