import {Component, OnInit} from '@angular/core';
import {Company} from '@app/client-lib';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {ModalLoadDto, ModalResult} from '../../../core/form/modal/modal.model';
import {CompanyModalComponent} from './company-modal/company-modal.component';
import {CompanyDataService} from '../store/company-data.service';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';
import {DataModalEditComponentBase} from '../../../core/component/data-modal-edit-component.base';

const errorMapping: ErrorMessageMapping<Company> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-company-edit',
  template: ``,
  styles: []
})
export class CompanyEditComponent extends DataModalEditComponentBase<Company> implements OnInit {
  constructor(
    private companyDataService: CompanyDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService

  ) {
    super(companyDataService, modalService, dataServiceErrorMessageService, errorMapping, CompanyModalComponent);
  }

  ngOnInit(): void {
  }
}
