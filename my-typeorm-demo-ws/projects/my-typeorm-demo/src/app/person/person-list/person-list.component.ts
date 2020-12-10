import {Component, Input, OnInit} from '@angular/core';
import {Person} from 'my-typeorm-demo-lib';
import {DATE_FORMAT} from '../../general/app.constants';
import {PersonService} from '../person.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  @Input() persons: Person[];

  dateFormat = DATE_FORMAT;

  constructor(
    private personService: PersonService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  delete(p: Person): void {
    if (!p) {
      return;
    }
    this.personService.delete(p.id).subscribe(
      result => this.toastr.info(`Person[${p.id}] deleted.`)
    );
  }
}
