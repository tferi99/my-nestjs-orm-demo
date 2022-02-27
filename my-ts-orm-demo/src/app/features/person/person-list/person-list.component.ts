import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Company, Person} from '@app/client-lib';
import {PersonEditComponent} from '../person-edit/person-edit.component';
import {BsModalService} from 'ngx-bootstrap/modal';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import {PersonDataService} from '../store/person-data.service';
import {CompanyDataService} from '../../company/store/company-data.service';
import {Store} from '@ngrx/store';
import {ListComponentBase} from '../../../core/component/list.component.base';
import {EditComponent} from '../../../core/component/data-modal-edit-component.base';
import {EntityCollection} from '@ngrx/data/src/reducers/entity-collection';

const errorMapping: ErrorMessageMapping<Company> = {
  'ForeignKeyConstraintViolationError' : {message: 'Item is used'}
}

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent extends ListComponentBase<Person, 'name'> implements OnInit {
  @ViewChild('edit') edit!: PersonEditComponent;

  persons$!: Observable<Person[]>;
  companiesEntityCollection$!: Observable<EntityCollection<Company>>;
  companyEntities$!: Observable<Company[]>;

  loadingP$!: Observable<boolean>;
  loadingC$!: Observable<boolean>;

  constructor(
    private store: Store<Person>,
    private companyDataService: CompanyDataService,
    private personDataService: PersonDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) {
    super(personDataService, modalService, dataServiceErrorMessageService);
    this.enabledDump = true;
  }

  ngOnInit(): void {
    // load
    this.personDataService.getAll();
    this.companyDataService.getAll();

    this.persons$ = this.personDataService.entities$;
    this.companiesEntityCollection$ = this.companyDataService.collection$
    this.companyEntities$ = this.companyDataService.entities$;

    this.loadingP$ = this.personDataService.loading$;
    this.loadingC$ = this.companyDataService.loading$;
  }

  protected getEditComponent(): EditComponent<Person> {
    return this.edit;
  }
  protected getNameOfName(): 'name' {
    return 'name';
  }

  getCompanyById(companies: EntityCollection, companyId: any, p: Person): Company | undefined {
    //console.log(`getCompanyById(): companyId: ${companyId}, p[${p.id}]: ${p.name}`);
    //console.log('coms: ', companies);
    if (companyId === undefined) {
      return undefined;
    }
    return companies.entities[companyId];
  }
}
