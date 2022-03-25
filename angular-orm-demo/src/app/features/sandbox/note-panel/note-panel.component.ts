import { Component, OnInit } from '@angular/core';
import {CHANGE_DETECTION_STRATEGY} from '../../../app.constants';
import {faker} from '@faker-js/faker';
import {NoteState} from '../../note/store/note.reducer';
import {Store} from '@ngrx/store';
import {addNote} from '../../note/store/note.actions';
import {Note} from '../../note/model/note.model';
import {NoteService} from '../../note/note.service';
import {Observable, of} from 'rxjs';
import {selectAllNotes, selectCounter3} from '../../note/store/note.selectors';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class NotePanelComponent implements OnInit {
  notes$!: Observable<Note[]>;
  counter3!: Observable<number>;

  get something(): string {
    console.log('~~~ Change Detection from Note');
    return '...';
  }

  constructor(
    private store: Store<NoteState>,
    private noteService: NoteService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.notes$ = this.store.select(selectAllNotes);
    this.counter3 = this.store.select(selectCounter3);

/*    this.notes$ = of([
      this.noteService.createRandomNote()
    ]);*/
  }

  triggerChangeDetection() {}

  addRandomNote() {
    const note = this.noteService.createRandomNote();
    this.store.dispatch(addNote({note}));
    this.toastr.info(note.label + ' : has been created.');
  }
}
