import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { InitEffects } from './store/init.effect';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // store
    EffectsModule.forFeature(
      [
        InitEffects,
      ]
    ),
  ]
})
export class InitModule { }
