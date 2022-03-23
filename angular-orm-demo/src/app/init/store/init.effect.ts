import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {NGXLogger} from 'ngx-logger';
import {tap} from 'rxjs/operators';
import {AppInitAction} from './init.actions';
import {InitService} from '../init.service';

@Injectable()
export class InitEffects {
  constructor(
    private actions$: Actions,
    private logger: NGXLogger,
    private initService: InitService,
  ) {}

  init$ = createEffect(() => this.actions$.pipe(
    ofType(AppInitAction),
    tap( () => this.initService.init())
  ), {
    dispatch: false
  });
}
