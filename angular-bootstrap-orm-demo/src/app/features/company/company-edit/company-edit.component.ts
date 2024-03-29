import {Component, OnInit} from '@angular/core';
import {Company} from '@app/client-lib';
import {BsModalService} from 'ngx-bootstrap/modal';
import {CompanyModalFormComponent} from './company-modal-form/company-modal-form.component';
import {CompanyDataService} from '../store/company-data.service';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import {ModalEditComponentBase, EditComponent} from '../../../core/component/modal-edit-component.base';

const errorMapping: ErrorMessageMapping<Company> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-company-edit',
  template: ``,
  styles: []
})
export class CompanyEditComponent extends ModalEditComponentBase<Company, any> implements OnInit, EditComponent<Company> {
  constructor(
    private companyDataService: CompanyDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService

  ) {
    super(CompanyModalFormComponent, companyDataService, modalService, dataServiceErrorMessageService, errorMapping, {class: 'modal-lg'});
  }

  ngOnInit(): void {
  }

  getAdditionalData(): any {
    return undefined;
  }

  beforeSave(data: Company): void {
  }
}
