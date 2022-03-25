import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {NoteState} from '../../note/store/note.reducer';
import {
  addNote,
  incrementNotesCounter1,
  incrementNotesCounter2,
  incrementNotesCounter3
} from '../../note/store/note.actions';
import {Observable} from 'rxjs';
import {selectCounter1, selectCounter2, selectCounter3} from '../../note/store/note.selectors';

@Component({
  selector: 'app-sandbox-header',
  templateUrl: './sandbox-header.component.html',
  styleUrls: ['./sandbox-header.component.scss']
})
export class SandboxHeaderComponent implements OnInit {
  counter1!: Observable<number>;
  counter2!: Observable<number>;
  counter3!: Observable<number>;

  constructor(
    private store: Store<NoteState>,
  ) { }

  ngOnInit(): void {
    this.counter1 = this.store.select(selectCounter1);
    this.counter2 = this.store.select(selectCounter2);
    this.counter3 = this.store.select(selectCounter3);
  }

  incrementCounter1() {
    this.store.dispatch(incrementNotesCounter1());
  }

  incrementCounter2() {
    this.store.dispatch(incrementNotesCounter2());
  }

  incrementCounter3() {
    this.store.dispatch(incrementNotesCounter3());
  }
}
