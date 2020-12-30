import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from './person.service';
import {Subject} from 'rxjs';
import {PersonDto} from 'my-typeorm-demo-lib';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  persons: PersonDto[];
  deleteEnable = new Subject<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.persons = this.route.snapshot.data.persons as PersonDto[];
    this.route.data.subscribe(
      (data)  => {
        this.persons = data.persons;
        this.deleteEnable.next(0);      // send signal to child to enable delete buttons
      }
    );
  }
}
