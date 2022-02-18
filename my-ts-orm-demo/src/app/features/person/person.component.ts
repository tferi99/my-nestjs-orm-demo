import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {Person} from '@app/client-lib';
import {PersonDataService} from './store/person-data.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  persons$!: Observable<Person[]>;
  deleteEnable: Observable<number> = new Subject<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personDataService: PersonDataService,
  ) {
  }

  ngOnInit(): void {
    this.personDataService.getAll();
    this.persons$ = this.personDataService.entities$;
/*    this.persons = this.route.snapshot.data.persons as Person[];
    this.route.data.subscribe(
      (data)  => {
        this.persons = data.persons;
        this.deleteEnable.next(0);      // send signal to child to enable delete buttons
      }
    );*/
  }
}
