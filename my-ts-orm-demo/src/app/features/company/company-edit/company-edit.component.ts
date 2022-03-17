import {Component, OnInit} from '@angular/core';
import {Company} from '@app/client-lib';
import {BsModalService} from 'ngx-bootstrap/modal';
import {CompanyModalFormComponent} from './company-modal-form/company-modal-form.component';
import {CompanyDataService} from '../store/company-data.service';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import {DataModalEditComponentBase, EditComponent} from '../../../core/component/data-modal-edit-component.base';

const errorMapping: ErrorMessageMapping<Company> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-company-edit',
  template: ``,
  styles: []
})
export class CompanyEditComponent extends DataModalEditComponentBase<Company, any> implements OnInit, EditComponent<Company> {
  constructor(
    private companyDataService: CompanyDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService

  ) {
    super(CompanyModalFormComponent, companyDataService, modalService, dataServiceErrorMessageService, errorMapping);
  }

  ngOnInit(): void {
  }

  getAdditional(): any {
    return undefined;
  }
}
