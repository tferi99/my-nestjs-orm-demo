import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Person} from 'my-typeorm-demo-lib';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  persons: Person[];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.persons = this.route.snapshot.data as Person[];
  }

  create(): void {
    this.router.navigateByUrl('person-new');
  }
}
