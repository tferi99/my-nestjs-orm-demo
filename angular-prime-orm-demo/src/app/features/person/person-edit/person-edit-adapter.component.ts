import { Component, Input, OnDestroy } from '@angular/core';
import { Company, Person } from '@app/client-lib';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PersonDataService } from '../store/person-data.service';
import { PersonModalFormComponent } from './person-modal-form/person-modal-form.component';
import { DataConverter } from '../../../core/form/DataConverter';
import { PersonEditConverter } from './person-edit-converter';
import { EditComponent, ModalFormAdapterBase } from '../../../core/component/modal-form-adapter.base';

const errorMapping: ErrorMessageMapping<Person> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

export interface PersonAdditionalData {
  companies: Company[] | null;
}

@Component({
  selector: 'app-person-edit-adapter',
  template: ``,
  styles: []
})
export class PersonEditAdapterComponent extends ModalFormAdapterBase<Person, PersonAdditionalData> implements EditComponent<Person>, OnDestroy {
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

  getAdditionalData(): PersonAdditionalData {
    return {
      companies: this.companies
    };
  }

  beforeSave(data: Person): void {
    const companyId: number = Number(data.company);
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
