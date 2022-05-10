import {Component, Input, OnInit} from '@angular/core';
import {Company, Person} from '@app/client-lib';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PersonModalFormComponent} from './person-modal-form/person-modal-form.component';
import {PersonDataService} from '../store/person-data.service';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';
import {DataModalEditComponentBase, EditComponent} from '../../../core/component/data-modal-edit-component.base';
import {Observable} from 'rxjs';
import {EntityCollection} from '@ngrx/data/src/reducers/entity-collection';

const errorMapping: ErrorMessageMapping<Person> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

export interface PersonAdditionalData {
  companies: Company[] | null;
}

@Component({
  selector: 'app-person-edit',
  template: `
    <!--
    {{companies | json}}
    -->`,
  styles: []
})
export class PersonEditComponent extends DataModalEditComponentBase<Person, PersonAdditionalData> implements OnInit, EditComponent<Person> {
  @Input() companies!: Company[] | null;

  constructor(
    private personDataService: PersonDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService

  ) {
    super(PersonModalFormComponent, personDataService, modalService, dataServiceErrorMessageService, errorMapping, {class: 'modal-lg'});
  }

  ngOnInit(): void {
  }

  dumpCompanies() {
    console.log("COMP:", )
  }

  getAdditionalData(): PersonAdditionalData {
    return {
      companies: this.companies
    };
  }

  beforeSave(data: Person): void {
    const companyId: number = data.company as unknown as number;
    if (companyId < 0) {
      // @ts-ignore
      data.company = null;
    }
    console.log('BEFORE SAVE:', data);
  }
}
