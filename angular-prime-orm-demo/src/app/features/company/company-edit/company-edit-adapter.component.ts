import { Component, OnDestroy } from '@angular/core';
import { Company } from '@app/client-lib';
import { CompanyModalFormComponent } from './company-modal-form/company-modal-form.component';
import { CompanyDataService } from '../store/company-data.service';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CompanyEditCoverter } from '../company-list/company-edit-coverter';
import { DataConverter } from '../../../core/form/DataConverter';
import { EditComponent, ModalFormAdapterBase } from '../../../core/component/modal-form-adapter.base';

const errorMapping: ErrorMessageMapping<Company> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-company-edit-adapter',
  template: ``,
  styles: []
})
export class CompanyEditAdapterComponent extends ModalFormAdapterBase<Company, any> implements EditComponent<Company>, OnDestroy {
  private editConverter = new CompanyEditCoverter();

  constructor(
    private companyDataService: CompanyDataService,
    private dialogService: DialogService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService

  ) {
    super('Company', CompanyModalFormComponent, companyDataService, dialogService, dataServiceErrorMessageService, errorMapping, {
      header: 'Choose a Product'
    });
  }

  getAdditionalData(): any {
    return undefined;
  }

  beforeSave(data: Company): void {
  }

  ngOnDestroy(): void {
    this.cleanup();
  }

  getEditConverter(): DataConverter<Company> {
    return this.editConverter;
  }
}
