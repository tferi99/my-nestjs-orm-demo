import { Component, Input, OnInit } from '@angular/core';
import { Person } from '@app/client-lib';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.scss']
})
export class PersonItemComponent implements OnInit {
  @Input() data!: Person;

  constructor() { }

  ngOnInit(): void {
  }

}
