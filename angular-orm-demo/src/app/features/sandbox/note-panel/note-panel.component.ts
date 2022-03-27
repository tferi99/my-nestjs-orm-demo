import { Component, OnInit } from '@angular/core';
import { CHANGE_DETECTION_STRATEGY } from '../../../app.constants';
import { NoteState } from '../../note/store/note.reducer';
import { Store } from '@ngrx/store';
import { addNote, deleteNote } from '../../note/store/note.actions';
import { Note } from '../../note/model/note.model';
import { NoteService } from '../../note/note.service';
import { Observable } from 'rxjs';
import { selectAllNotes, selectCounter3 } from '../../note/store/note.selectors';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-note-panel',
  templateUrl: './note-panel.component.html',
  styleUrls: ['./note-panel.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class NotePanelComponent implements OnInit {
  notes$!: Observable<Note[]>;
  itemsForm: FormGroup = new FormGroup({
    dummy: new FormControl()
  });
  counter3!: Observable<number>;

  get something(): string {
    console.log('~~~ Change Detection from Note');
    return '...';
  }

  constructor(
    private store: Store<NoteState>,
    private noteService: NoteService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.notes$ = this.store.select(selectAllNotes).pipe(
      map(items => {
        this.itemsForm = this.fb.group({});
        items.forEach(p => this.itemsForm.addControl(p.id.toString(), new FormControl(false)));
        return items;
      })
    );
    this.counter3 = this.store.select(selectCounter3);

/*    this.notes$ = of([
      this.noteService.createRandomNote()
    ]);*/
  }

  triggerChangeDetection() {}

  onItemsSubmit(): void {
    const data: any = this.itemsForm.value;
    // console.log('RESULT: ', data);
    for (let key in data) {
      if (data[key]) {
        this.store.dispatch(deleteNote({id: key}));
      }
    }
  }

  addRandomNote() {
    const note = this.noteService.createRandomNote();
    this.store.dispatch(addNote({note}));
    this.toastr.info(note.label + ' : has been created.');
  }
}
