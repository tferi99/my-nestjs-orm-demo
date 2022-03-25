import {createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Note} from '../model/note.model';
import * as NoteActions from './note.actions';

export const notesFeatureKey = 'notes';

export interface NoteState extends EntityState<Note> {
  counter1: number;
  counter2: number;
  counter3: number;
}

export const adapter: EntityAdapter<Note> = createEntityAdapter<Note>();

export const initialState: NoteState = adapter.getInitialState({
  counter1: 0,
  counter2: 0,
  counter3: 0,
});


export const reducer = createReducer(
  initialState,
  on(NoteActions.addNote,
    (state, action) => adapter.addOne(action.note, state)
  ),
  on(NoteActions.upsertNote,
    (state, action) => adapter.upsertOne(action.note, state)
  ),
  on(NoteActions.addNotes,
    (state, action) => adapter.addMany(action.notes, state)
  ),
  on(NoteActions.upsertNotes,
    (state, action) => adapter.upsertMany(action.notes, state)
  ),
  on(NoteActions.updateNote,
    (state, action) => adapter.updateOne(action.note, state)
  ),
  on(NoteActions.updateNotes,
    (state, action) => adapter.updateMany(action.notes, state)
  ),
  on(NoteActions.deleteNote,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(NoteActions.deleteNotes,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(NoteActions.loadNotes,
    (state, action) => adapter.setAll(action.notes, state)
  ),
  on(NoteActions.clearNotes,
    state => adapter.removeAll(state)
  ),
  on(NoteActions.incrementNotesCounter1, state => ({...state, counter1: state.counter1 + 1})),
  on(NoteActions.incrementNotesCounter2, state => ({...state, counter2: state.counter2 + 1})),
  on(NoteActions.incrementNotesCounter3, state => ({...state, counter3: state.counter3 + 1})),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
