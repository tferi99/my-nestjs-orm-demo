import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Person} from 'my-typeorm-demo-lib';
import {PersonService} from './person.service';
import {ToastrService} from 'ngx-toastr';
import {AppMessengerService} from '../shared/app-messenger.service';
import {Subject, Subscription} from 'rxjs';
import {AppMessageType} from '../shared/app-message-type';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  persons: Person[];
  deleteEnable = new Subject<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService,
  ) {
  }

  ngOnInit(): void {
    this.persons = this.route.snapshot.data.persons as Person[];
    this.route.data.subscribe(
      (data)  => {
        this.persons = data.persons;
        this.deleteEnable.next(0);      // send signal to child to enable delete buttons
      }
    );
  }
}
