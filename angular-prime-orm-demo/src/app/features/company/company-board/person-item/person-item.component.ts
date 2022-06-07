import { Component, Input, OnInit } from '@angular/core';
import { Company, Person } from '@app/client-lib';
import { PersonEditAdapterComponent } from '../../../person/person-edit/person-edit-adapter.component';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.scss']
})
export class PersonItemComponent implements OnInit {
  @Input() person!: Person;
  @Input() personEdit!: PersonEditAdapterComponent;

  constructor() { }

  ngOnInit(): void {
  }

  editPerson(person: Person) {
    this.personEdit.onEdit(person);
  }

}
