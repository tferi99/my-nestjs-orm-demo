import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DATE_FORMAT} from '../../common/app.constants';
import {CompanyService} from '../company.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {CompanyDto} from '../../../../../my-ts-orm-demo-lib/src/lib/my-ts-orm-demo-lib.model';
import {Company} from '@app/my-ts-orm-demo-lib';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit, OnDestroy {
  @Input() companies: CompanyDto[];
  @Input() enableDeletingTrigger: Observable<number>;

  dateFormat = DATE_FORMAT;
  navigationSubs: Subscription;
  deleting = false;

  constructor(
    private router: Router,
    private companyService: CompanyService,
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
        data => this.deleting = false
      );
    }
  }

  delete(p: Company): void {
    if (!p) {
      return;
    }
    this.deleting = true;
    this.companyService.delete(p.id).subscribe(
      result => {
        this.toastr.warning(`Company[${p.id}] deleted.`);
        this.router.navigateByUrl('/company');
      }
    );
  }

  copy(p: Company): void  {
    p.id = undefined;
    this.router.navigateByUrl('/company/new', {state: p});
  }
}
