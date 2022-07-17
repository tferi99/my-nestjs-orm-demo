import { Component, OnInit, ViewChild } from '@angular/core';
import { CHANGE_DETECTION_STRATEGY } from '../../../app.constants';
import { PersonEditAdapterComponent } from '../person-edit/person-edit-adapter.component';
import { Observable } from 'rxjs';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { map, tap } from 'rxjs/operators';
import { EditComponent } from '../../../core/component/modal-edit-adapter.base';
import { PersonDataService } from '../store/person-data.service';
import { ListComponentBase } from '../../../core/component/list.component.base';
import { Company, Person } from '@app/client-lib';
import { EntityCollection } from '@ngrx/data';
import { CompanyDataService } from '../../company/store/company-data.service';

const errorMapping: ErrorMessageMapping<Person> = {
  'ForeignKeyConstraintViolationError' : {message: 'Item is used'}
}

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class PersonListComponent extends ListComponentBase<Person, 'name'> implements OnInit {
  @ViewChild('edit') edit!: PersonEditAdapterComponent;

  persons$!: Observable<Person[]>;
  loading$!: Observable<boolean>;
  companiesEntityCollection$!: Observable<EntityCollection<Company>>;
  companyEntities$!: Observable<Company[]>;

  constructor(
    private companyDataService: CompanyDataService,
    private personDataService: PersonDataService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    super(personDataService, dialogService, confirmationService, dataServiceErrorMessageService, errorMapping);
  }

  ngOnInit(): void {
    // load
    this.personDataService.getAll();
    this.companyDataService.getAll();

    this.persons$ = this.personDataService.entities$;
    this.companiesEntityCollection$ = this.companyDataService.collection$
    this.companyEntities$ = this.companyDataService.entities$;

    this.loading$ = this.personDataService.loading$;
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
