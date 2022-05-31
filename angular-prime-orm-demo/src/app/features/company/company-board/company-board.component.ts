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
import { DragDropService } from '../drag-drop.service';
import { DragDropAction } from '../drag-drop-service.base';

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

  loadingP$!: Observable<boolean>;
  loadingC$!: Observable<boolean>;

  deleting = false;
  COMPANY_ID_RUBBISH_BIN = COMPANY_ID_RUBBISH_BIN.toString();
  dragDropActionEnum = DragDropAction;

  companyErrorMapping: ErrorMessageMapping<Company> = {
    'ForeignKeyConstraintViolationError': {message: 'Item is used'}
  }

  constructor(
    private store: Store<AppState>,
    private companyDataService: CompanyDataService,
    private personDataService: PersonDataService,
    public handler: DragDropService,
  ) {}

  ngOnInit(): void {
    this.companyDataService.getAll();
    this.personDataService.getAll();

    this.companies$ =  this.store.select(selectCompaniesWithPersonsAssoc);

    this.loadingP$ = this.personDataService.loading$;
    this.loadingC$ = this.companyDataService.loading$;
  }

  getClassByCompany(company: Company): string {
    switch (company.id) {
      case COMPANY_ID_UNEMPLOYED:
        return "unemployed-panel";
      case COMPANY_ID_RUBBISH_BIN:
        return "rubbish-panel";
      default:
        return company.active ? "company-panel" : '';
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

  getHeaderForCompany(company: Company): string {
    if (this.isTargetNormal(company.id)) {
      return `[${company.id}] - ${company.name}`;
    }
    if (this.isTargetUnemployed(company.id)) {
      return 'UNEMPLOYED'
    };
    return '';
  }
}
