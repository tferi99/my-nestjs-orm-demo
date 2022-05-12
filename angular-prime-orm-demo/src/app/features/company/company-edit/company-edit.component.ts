import {Component, OnInit} from '@angular/core';
import {Company} from '@app/client-lib';
import {CompanyModalFormComponent} from './company-modal-form/company-modal-form.component';
import {CompanyDataService} from '../store/company-data.service';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import {ModalEditComponentBase, EditComponent} from '../../../core/component/modal-edit-component.base';
import { DialogService } from 'primeng/dynamicdialog';

const errorMapping: ErrorMessageMapping<Company> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-company-edit',
  template: ``,
  styles: []
})
export class CompanyEditComponent extends ModalEditComponentBase<Company, any> implements EditComponent<Company> {
  constructor(
    private companyDataService: CompanyDataService,
    private dialogService: DialogService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService

  ) {
    super('Company', CompanyModalFormComponent, companyDataService, dialogService, dataServiceErrorMessageService, errorMapping, {
      header: 'Choose a Product',
      width: '70%',
      height: '500px',
      contentStyle: {"overflow": "hidden"},
    });
  }

  getAdditionalData(): any {
    return undefined;
  }

  beforeSave(data: Company): void {
  }
}
