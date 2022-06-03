import {Component, Input} from '@angular/core';
import {DeleteWithConfirmComponent} from '../../../core/component/delete-with-confirm/delete-with-confirm.component';
import {Company} from '@app/client-lib';
import {CompanyDataService} from '../../../features/company/store/company-data.service';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';
import { ConfirmationService } from 'primeng/api';

const errorMapping: ErrorMessageMapping<Company> = {
  'ForeignKeyConstraintViolationError': {message: 'Item is used'}
}

@Component({
  selector: 'app-company-delete',
  templateUrl: '../../../core/component/delete-with-confirm/delete-with-confirm.component.html',
  styleUrls: ['../../../core/component/delete-with-confirm/delete-with-confirm.component.scss',]
})
export class CompanyDeleteComponent extends DeleteWithConfirmComponent<Company> {
  @Input() data!: Company;

  constructor(
    private companyDataService: CompanyDataService,
    public confirmationService: ConfirmationService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) {
    super(companyDataService, confirmationService, dataServiceErrorMessageService, errorMapping);
  }

  getName(data: Company): string {
    return data.name;
  }

  getData(): Company {
    return this.data;
  }
}
