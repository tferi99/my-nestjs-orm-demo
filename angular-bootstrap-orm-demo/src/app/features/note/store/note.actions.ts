import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Note } from '../model/note.model';

export const loadNotes = createAction(
  '[Note/API] Load Notes',
  props<{ notes: Note[] }>()
);

export const addNote = createAction(
  '[Note/API] Add Note',
  props<{ note: Note }>()
);

export const upsertNote = createAction(
  '[Note/API] Upsert Note',
  props<{ note: Note }>()
);

export const addNotes = createAction(
  '[Note/API] Add Notes',
  props<{ notes: Note[] }>()
);

export const upsertNotes = createAction(
  '[Note/API] Upsert Notes',
  props<{ notes: Note[] }>()
);

export const updateNote = createAction(
  '[Note/API] Update Note',
  props<{ note: Update<Note> }>()
);

export const updateNotes = createAction(
  '[Note/API] Update Notes',
  props<{ notes: Update<Note>[] }>()
);

export const deleteNote = createAction(
  '[Note/API] Delete Note',
  props<{ id: string }>()
);

export const deleteNotes = createAction(
  '[Note/API] Delete Notes',
  props<{ ids: string[] }>()
);

export const clearNotes = createAction(
  '[Note/API] Clear Notes'
);

export const incrementNotesCounter1 = createAction(
  '[Note/API] Counter1++'
);

export const incrementNotesCounter2 = createAction(
  '[Note/API] Counter2++'
);

export const incrementNotesCounter3 = createAction(
  '[Note/API] Counter3++'
);
