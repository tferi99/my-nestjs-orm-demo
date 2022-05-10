import {Component, OnInit} from '@angular/core';
import {Company} from '@app/client-lib';
import {CompanyModalFormComponent} from './company-modal-form/company-modal-form.component';
import {CompanyDataService} from '../store/company-data.service';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import {DataModalEditComponentBase, EditComponent} from '../../../core/component/data-modal-edit-component.base';
import { DialogService } from 'primeng/dynamicdialog';

const errorMapping: ErrorMessageMapping<Company> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-company-edit',
  template: ``,
  styles: []
})
export class CompanyEditComponent extends DataModalEditComponentBase<Company, any> implements EditComponent<Company> {
  constructor(
    private companyDataService: CompanyDataService,
    private dialogService: DialogService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService

  ) {
    super(CompanyModalFormComponent, companyDataService, dialogService, dataServiceErrorMessageService, errorMapping, {
      header: 'Choose a Product',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
    });
  }

  getAdditionalData(): any {
    return undefined;
  }

  beforeSave(data: Company): void {
  }
}
