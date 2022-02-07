import {Component, OnInit} from '@angular/core';
import {Person} from '@app/my-ts-orm-demo-lib';

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
  }

  submitted(event): void {
    console.log('### SUBMITTED: ', event);
  }
}
