import { Component, Input } from '@angular/core';
import { Company, Person } from '@app/client-lib';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import { EditComponent, ModalEditAdapterBase } from '../../../core/component/modal-edit-adapter.base';
import { DialogService } from 'primeng/dynamicdialog';
import { PersonDataService } from '../store/person-data.service';
import { PersonModalFormComponent } from './person-modal-form/person-modal-form.component';

const errorMapping: ErrorMessageMapping<Person> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-person-edit-adapter',
  template: ``,
  styles: []
})
export class PersonEditAdapterComponent extends ModalEditAdapterBase<Person, any> implements EditComponent<Person> {
  @Input() companies!: Company[] | null;

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
}
