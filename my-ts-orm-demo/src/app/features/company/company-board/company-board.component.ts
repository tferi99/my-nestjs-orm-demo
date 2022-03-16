import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CompanyDataService} from '../store/company-data.service';
import {Company, Person} from '@app/client-lib';
import {PersonDataService} from '../../person/store/person-data.service';
import {AppState} from '../../../store/app.reducer';
import {
  COMPANY_ID_RUBBISH_BIN,
  COMPANY_ID_UNEMPLOYED,
  CompanyView,
  selectCompaniesMod,
  selectCompaniesWithPersons, selectCompaniesWithPersonsAssoc
} from '../store/company.selectors';
import {Store} from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {OneToManyAssociation} from '../../../core/store/store-utils';
import {PersonDragDropService} from './person-drag-drop.service';
import {EffectAllowed} from 'ngx-drag-drop';

const comps: Company[] = [
  { id:0, name: 'Abc', note: 'aaaa', active: true, created: new Date(), updated: new Date(), established: new Date(), workers: [] },
  { id:1, name: 'Abc1', note: 'aaaa1', active: true, created: new Date(), updated: new Date(), established: new Date(), workers: [] },
];

@Component({
  selector: 'app-company-board',
  templateUrl: './company-board.component.html',
  styleUrls: ['./company-board.component.scss']
})
export class CompanyBoardComponent implements OnInit {
  //companies$!: Observable<CompanyView>;
  //companies$!: Observable<Dictionary<Company>>;
  //companies$!: Observable<Company[]>;
  companies$!: Observable<OneToManyAssociation<Company, Person>[]>;

  loadingP$!: Observable<boolean>;
  loadingC$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private companyDataService: CompanyDataService,
    private personDataService: PersonDataService,
    public handler: PersonDragDropService,
  ) {}

  ngOnInit(): void {
    this.companyDataService.getAll();
    this.personDataService.getAll();

/*    const store = this.personDataService.store;
    store.subscribe(
      state => console.log('ST: ', state)
    );*/

    //this.companies$ =  this.companyDataService.entities$;
    //this.companies$ =  this.store.select(selectCompaniesWithPersons);
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
    const normal = companyId >= 0;
    console.log('IDDD:' + companyId + ' -> ' + normal );
    return normal;
  }

  isTargetRubbishBin(companyId: number): boolean {
    return companyId === COMPANY_ID_RUBBISH_BIN;
  }

  isTargetUnemployed(companyId: number): boolean {
    return companyId === COMPANY_ID_UNEMPLOYED;
  }
}
