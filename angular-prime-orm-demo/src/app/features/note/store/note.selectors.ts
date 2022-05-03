import {notesFeatureKey, NoteState, selectAll} from './note.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';


export const selectNoteState = createFeatureSelector<NoteState>(notesFeatureKey);

export const selectAllNotes = createSelector(
  selectNoteState,
  selectAll
);

export const selectCounter1 = createSelector(
  selectNoteState,
  (state: NoteState) => state.counter1
);

export const selectCounter2 = createSelector(
  selectNoteState,
  (state: NoteState) => state.counter2
);

export const selectCounter3 = createSelector(
  selectNoteState,
  (state: NoteState) => state.counter3
);
