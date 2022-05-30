import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {CompanyDataService} from '../store/company-data.service';
import {Company, Person} from '@app/client-lib';
import {PersonDataService} from '../../person/store/person-data.service';
import {AppState} from '../../../store/app.reducer';

import {selectCompaniesWithPersonsAssoc} from '../store/company.selectors';
import {Store} from '@ngrx/store';
import {OneToManyAssociation} from '../../../core/store/store-utils';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';
import {COMPANY_ID_RUBBISH_BIN, COMPANY_ID_UNEMPLOYED} from '../company.constants';
import {CHANGE_DETECTION_STRATEGY} from '../../../app.constants';
import { PersonEditAdapterComponent } from '../../person/person-edit/person-edit-adapter.component';
import { CompanyEditAdapterComponent } from '../company-edit/company-edit-adapter.component';
import { MenuItem } from 'primeng/api';

const d = new Date();
const rubbishBin: Company = { name: 'Rubbish Bin', workers: [], id: COMPANY_ID_RUBBISH_BIN, active: true, established: d, created: d, updated: d, note: ''};

@Component({
  selector: 'app-company-board',
  templateUrl: './company-board.component.html',
  styleUrls: ['./company-board.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class CompanyBoardComponent implements OnInit {
  @ViewChild('companyEdit') companyEdit!: CompanyEditAdapterComponent;
  @ViewChild('personEdit') personEdit!: PersonEditAdapterComponent;

  companies$!: Observable<OneToManyAssociation<Company, Person>[]>;
  items!: MenuItem[];

  loadingP$!: Observable<boolean>;
  loadingC$!: Observable<boolean>;

  deleting = false;
  COMPANY_ID_RUBBISH_BIN = COMPANY_ID_RUBBISH_BIN.toString();

  companyErrorMapping: ErrorMessageMapping<Company> = {
    'ForeignKeyConstraintViolationError': {message: 'Item is used'}
  }

  constructor(
    private store: Store<AppState>,
    private companyDataService: CompanyDataService,
    private personDataService: PersonDataService,
//    public handler: DragDropService,
  ) {}

  ngOnInit(): void {
    this.companyDataService.getAll();
    this.personDataService.getAll();

    this.companies$ =  this.store.select(selectCompaniesWithPersonsAssoc);

    this.loadingP$ = this.personDataService.loading$;
    this.loadingC$ = this.companyDataService.loading$;

    this.items = [
      {
        label: 'Options',
        items: [{
          label: 'Update',
          icon: 'pi pi-refresh',
          command: () => {
            this.test();
          }
        },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {
              this.test();
            }
          }
        ]},
      {
        label: 'Navigate',
        items: [{
          label: 'Angular',
          icon: 'pi pi-external-link',
          url: 'http://angular.io'
        },
          {
            label: 'Router',
            icon: 'pi pi-upload',
            routerLink: '/fileupload'
          }
        ]}
    ];
  }

  getClassByCompany(company: Company): string {
    switch (company.id) {
      case COMPANY_ID_UNEMPLOYED:
        return "alert-warning";
      case COMPANY_ID_RUBBISH_BIN:
        return "alert-danger";
      default:
        return company.active ? "alert-primary" : 'alert-secondary';
    }
  }

  isTargetNormal(companyId: number): boolean {
    return companyId >= 0;
  }

  isTargetRubbishBin(companyId: number): boolean {
    return companyId === COMPANY_ID_RUBBISH_BIN;
  }

  isTargetUnemployed(companyId: number): boolean {
    return companyId === COMPANY_ID_UNEMPLOYED;
  }

  addCompany() {
    this.companyEdit.onNew();
  }

  editCompany(company: Company) {
    this.companyEdit.onEdit(company);
  }

  addPerson() {
    console.log('pppp');
    this.personEdit.onNew();
  }

  editPerson(person: Person) {
    this.personEdit.onEdit(person);
  }

  private test() {

  }
}
