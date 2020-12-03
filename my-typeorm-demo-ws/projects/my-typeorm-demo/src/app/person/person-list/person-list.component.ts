import {Component, Input, OnInit} from '@angular/core';
import {Person} from 'my-typeorm-demo-lib';
import {DATE_FORMAT} from '../../general/app.constants';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  @Input() persons: Person[];

  dateFormat = DATE_FORMAT;

  constructor() { }

  ngOnInit(): void {
  }
}
