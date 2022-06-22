import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromNote from './store/note.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../auth/store/auth.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // store
    StoreModule.forFeature(fromNote.notesFeatureKey, fromNote.reducer),
  ]
})
export class NoteModule { }
