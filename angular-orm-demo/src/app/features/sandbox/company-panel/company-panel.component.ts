import {Component, OnInit} from '@angular/core';
import {CompanyDataService} from '../../company/store/company-data.service';
import {Observable} from 'rxjs';
import {Company} from '@app/client-lib';
import {faker} from '@faker-js/faker';
import {ToastrService} from 'ngx-toastr';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import {CHANGE_DETECTION_STRATEGY} from '../../../app.constants';
import {selectCounter1} from '../../note/store/note.selectors';
import {Store} from '@ngrx/store';
import {NoteState} from '../../note/store/note.reducer';

const errorMapping: ErrorMessageMapping<Company> = {
}

@Component({
  selector: 'app-company-panel',
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class CompanyPanelComponent implements OnInit {
  companies$!: Observable<Company[]>;
  counter1!: Observable<number>;

  get something(): string {
    console.log('### Change Detection from Company');
    return '...';
  }

  constructor(
    private companyDataService: CompanyDataService,
    private toastr: ToastrService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService,
  private store: Store<NoteState>,
  ) { }

  ngOnInit(): void {
    this.companyDataService.getAll();

    this.companies$ = this.companyDataService.entities$;
    this.counter1 = this.store.select(selectCounter1);
  }

  addRandomCompany() {
    const c: Partial<Company> = {
      name: faker.company.companyName(),
      established: faker.date.past(100),
      active: Math.random() > .5,
    }

    this.companyDataService.add(c, {isOptimistic: false}).subscribe(
      () => this.toastr.success(c.name + ' : has been created.'),
      error => this.dataServiceErrorMessageService.showErrorMessage(error, errorMapping)
    );
  }

  triggerChangeDetection() {}
}
