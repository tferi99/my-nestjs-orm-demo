import { Injectable } from '@angular/core';
import {Note} from './model/note.model';
import {faker} from '@faker-js/faker';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private lastId = 0;

  constructor() { }

  getNewId(): number {
    return ++this.lastId;
  }

  createRandomNote(): Note {
    const label = faker.lorem.word(10);
    const message = faker.lorem.words(10);
    const note: Note = {
      id: this.getNewId(),
      label,
      message,
      active: Math.random() > 0.5
    }
    return note;
  }

}
