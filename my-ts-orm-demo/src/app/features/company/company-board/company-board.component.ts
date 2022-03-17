import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {CompanyDataService} from '../store/company-data.service';
import {Company, Person} from '@app/client-lib';
import {PersonDataService} from '../../person/store/person-data.service';
import {AppState} from '../../../store/app.reducer';

import {selectCompaniesWithPersonsAssoc} from '../store/company.selectors';
import {Store} from '@ngrx/store';
import {OneToManyAssociation} from '../../../core/store/store-utils';
import {PersonDragDropService} from './person-drag-drop.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';
import {CompanyEditComponent} from '../company-edit/company-edit.component';
import {PersonEditComponent} from '../../person/person-edit/person-edit.component';
import {COMPANY_ID_RUBBISH_BIN, COMPANY_ID_UNEMPLOYED} from '../company.constants';

const d = new Date();
const rubbishBin: Company = { name: 'Rubbish Bin', workers: [], id: COMPANY_ID_RUBBISH_BIN, active: true, established: d, created: d, updated: d, note: ''};

@Component({
  selector: 'app-company-board',
  templateUrl: './company-board.component.html',
  styleUrls: ['./company-board.component.scss']
})
export class CompanyBoardComponent implements OnInit {
  @ViewChild('companyEdit') companyEdit!: CompanyEditComponent;
  @ViewChild('personEdit') personEdit!: PersonEditComponent;

  companies$!: Observable<OneToManyAssociation<Company, Person>[]>;

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
    public handler: PersonDragDropService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) {}

  ngOnInit(): void {
    this.companyDataService.getAll();
    this.personDataService.getAll();

    this.companies$ =  this.store.select(selectCompaniesWithPersonsAssoc);

    this.loadingP$ = this.personDataService.loading$;
    this.loadingC$ = this.companyDataService.loading$;
  }

  getClassByCompany(companyId: number): string {
    switch (companyId) {
      case COMPANY_ID_UNEMPLOYED:
        return "alert-warning";
      case COMPANY_ID_RUBBISH_BIN:
        return "alert-danger";
      default:
        return "alert-dark";
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
}
