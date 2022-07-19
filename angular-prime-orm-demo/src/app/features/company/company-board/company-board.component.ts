import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, fromEvent, Observable } from 'rxjs';
import { CompanyDataService } from '../store/company-data.service';
import { Company, Person } from '@app/client-lib';
import { PersonDataService } from '../../person/store/person-data.service';
import { AppState } from '../../../store/app.reducer';

import { selectCompaniesWithPersonsAssoc } from '../store/company.selectors';
import { Store } from '@ngrx/store';
import { OneToManyAssociation } from '../../../core/store/store-utils';
import { ErrorMessageMapping } from '../../../core/store/data-service-error-message.service';
import { COMPANY_ID_RUBBISH_BIN, COMPANY_ID_UNEMPLOYED } from '../company.constants';
import { CHANGE_DETECTION_STRATEGY } from '../../../app.constants';
import { PersonEditAdapterComponent } from '../../person/person-edit/person-edit-adapter.component';
import { CompanyEditAdapterComponent } from '../company-edit/company-edit-adapter.component';
import { DragDropService } from '../drag-drop.service';
import { DragDropAction } from '../drag-drop-service.base';
import { map, tap } from 'rxjs/operators';

const d = new Date();
const rubbishBin: Company = { name: 'Rubbish Bin', workers: [], id: COMPANY_ID_RUBBISH_BIN, active: true, established: d, created: d, updated: d, note: ''};

@Component({
  selector: 'app-company-board',
  templateUrl: './company-board.component.html',
  styleUrls: ['./company-board.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class CompanyBoardComponent implements OnInit, AfterViewInit {
  @ViewChild('companyEdit') companyEdit!: CompanyEditAdapterComponent;
  @ViewChild('personEdit') personEdit!: PersonEditAdapterComponent;
  @ViewChild("searchFilter") searchFilter!: ElementRef;

  COMPANY_ID_RUBBISH_BIN = COMPANY_ID_RUBBISH_BIN.toString();
  dragDropActionEnum = DragDropAction;
  companies$!: Observable<OneToManyAssociation<Company, Person>[]>;

  loadingP$!: Observable<boolean>;
  loadingC$!: Observable<boolean>;

  deleting = false;
  searchFilterSubject$ = new BehaviorSubject<string>('');
  filter!: string


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

    this.loadingP$ = this.personDataService.loading$;
    this.loadingC$ = this.companyDataService.loading$;

    this.searchFilterSubject$.subscribe(
      val => console.log('FILTER:' + val)
    );
  }

  ngAfterViewInit(): void {
    this.companies$ = combineLatest(
      [this.store.select(selectCompaniesWithPersonsAssoc), this.searchFilterSubject$],
      (companies, filter) => {
        console.log('COMBINED FILTER: ', filter);
        return companies.filter(c => c.parent.id == COMPANY_ID_UNEMPLOYED || c.parent.name.toLowerCase().includes(filter));
      }
    );

/*    const target: HTMLInputElement = this.searchFilter.nativeElement as HTMLInputElement;
    fromEvent(target, 'keyup').pipe(
      map(event => ((event as KeyboardEvent).target as HTMLInputElement).value),
      debounceTime(350),
      distinctUntilChanged(),
      tap(val => console.log('FILTER: ', val))
    ).subscribe(
      (val: string) => this.searchFilterSubject$.next(val)
    );*/
  }

  addCompany() {
    this.companyEdit.onNew();
  }

  editPerson(person: Person) {
    this.personEdit.onEdit(person);
  }

  private test() {

  }

  resetFilter() {
    this.filter = '';
    this.searchFilterSubject$.next('')
  }
}
