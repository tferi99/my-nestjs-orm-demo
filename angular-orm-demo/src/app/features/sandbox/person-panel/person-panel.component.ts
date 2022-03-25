import { Component, OnInit } from '@angular/core';
import {PersonDataService} from '../../person/store/person-data.service';
import {Observable} from 'rxjs';
import {Company, EmployeeType, Person} from '@app/client-lib';
import {faker} from '@faker-js/faker';
import {randomStringEnum} from '../../../core/util/random-utils';
import {ToastrService} from 'ngx-toastr';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import {CHANGE_DETECTION_STRATEGY} from '../../../app.constants';
import {NoteService} from '../../note/note.service';
import {addNote} from '../../note/store/note.actions';
import {Store} from '@ngrx/store';
import {NoteState} from '../../note/store/note.reducer';
import {selectCounter2} from '../../note/store/note.selectors';

const errorMapping: ErrorMessageMapping<Person> = {
}

@Component({
  selector: 'app-person-panel',
  templateUrl: './person-panel.component.html',
  styleUrls: ['./person-panel.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class PersonPanelComponent implements OnInit {
  persons$!: Observable<Person[]>;
  counter2!: Observable<number>;

  get something(): string {
    console.log('+++ Change Detection from Person');
    return '...';
  }

  constructor(
    private personDataService: PersonDataService,
    private toastr: ToastrService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService,
    private store: Store<NoteState>,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.personDataService.getAll();

    this.persons$ = this.personDataService.entities$;
    this.counter2 = this.store.select(selectCounter2);
  }

  addRandomPerson() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    const p: Partial<Person> = {
      name: firstName + ' ' + lastName,
      email: faker.internet.email(firstName, lastName),
      employeeType: randomStringEnum(EmployeeType),
      rank: Math.ceil(Math.random() * 90),
      birth: faker.date.past(80),
      active: Math.random() > .5
    };

    this.personDataService.add(p, {isOptimistic: false}).subscribe(
      () => this.toastr.warning(p.name + ' : has been created.'),
      error => this.dataServiceErrorMessageService.showErrorMessage(error, errorMapping)
    );
  }

  triggerChangeDetection() {}

  addRandomNote() {
    const note = this.noteService.createRandomNote();
    this.store.dispatch(addNote({note}));
    this.toastr.info(note.label + ' : has been created.');
  }
}
