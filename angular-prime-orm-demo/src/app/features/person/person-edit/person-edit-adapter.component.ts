import { Component, Input, OnDestroy } from '@angular/core';
import { Company, Person } from '@app/client-lib';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import { EditComponent, ModalEditAdapterBase } from '../../../core/component/modal-edit-adapter.base';
import { DialogService } from 'primeng/dynamicdialog';
import { PersonDataService } from '../store/person-data.service';
import { PersonModalFormComponent } from './person-modal-form/person-modal-form.component';
import { DataConverter } from '../../../core/form/DataConverter';
import { CompanyEditCoverter } from '../../company/company-list/company-edit-coverter';
import { PersonEditConverter } from './person-edit-converter';

const errorMapping: ErrorMessageMapping<Person> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-person-edit-adapter',
  template: ``,
  styles: []
})
export class PersonEditAdapterComponent extends ModalEditAdapterBase<Person, any> implements EditComponent<Person>, OnDestroy {
  @Input() companies!: Company[] | null;
  private editConverter = new PersonEditConverter();

  constructor(
    private personDataService: PersonDataService,
    private dialogService: DialogService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService

  ) {
    super('Person', PersonModalFormComponent, personDataService, dialogService, dataServiceErrorMessageService, errorMapping, {
      header: 'Choose a Product'
    });
  }

  getAdditionalData(): any {
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

  ngOnDestroy(): void {
    this.cleanup();
  }

  getEditConverter(): DataConverter<Person> {
    return this.editConverter;
  }
}
