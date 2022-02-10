import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DATE_FORMAT} from '../../core/app.constants';
import {PersonService} from '../person.service';
import {ToastrService} from 'ngx-toastr';
import {NavigationEnd, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Person} from '@app/client-lib';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, OnDestroy {
  @Input() persons!: Person[];
  @Input() enableDeletingTrigger!: Observable<number>;

  dateFormat = DATE_FORMAT;
  navigationSubs!: Subscription;
  deleting = false;

  constructor(
    private router: Router,
    private personService: PersonService,
    private toastr: ToastrService
  ) {
/*    this.navigationSubs = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });*/
  }

/*  initialiseInvites() {
    // Set default values and re-fetch any data you need.
  }*/

  ngOnDestroy(): void {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubs) {
      this.navigationSubs.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (this.enableDeletingTrigger) {
      this.enableDeletingTrigger.subscribe(
        data => this.deleting = false,
        error => this.deleting = false
      );
    }
  }

  delete(p: Person): void {
    if (!p) {
      return;
    }
    this.deleting = true;
    this.personService.delete(p.id).subscribe(
      result => {
        this.toastr.warning(`Person[${p.id}] deleted.`);
        this.router.navigateByUrl('/person');
      }
    );
  }

  copy(p: Person): void  {
    // @ts-ignore
    delete p.id;
    this.router.navigateByUrl('/person/new', {state: p});
  }
}
