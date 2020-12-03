import {Component, OnInit} from '@angular/core';
import {EmployeeType, Person} from 'my-typeorm-demo-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-typeorm-demo';
  data: Person;
  persons: Person[] = [];

  ngOnInit(): void {
    const birth = new Date();
    birth.setTime(birth.getTime() - (30 * 365 * 24 * 3600 * 1000));

    this.data = {
      id: 0,
      firstName: 'John',
      lastName: 'Smith',
      birth,
      email: 'js@test.org',
      employeeType: EmployeeType.WORKER,
      rank: 3,
      active: false
    };
    this.persons.push(this.data);
  }

  submitted(event): void {
    console.log('### SUBMITTED: ', event);
  }
}
