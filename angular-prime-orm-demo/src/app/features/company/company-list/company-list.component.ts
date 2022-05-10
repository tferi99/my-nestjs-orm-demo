import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from '@app/client-lib';
import { Observable } from 'rxjs';
import { CompanyDataService } from '../store/company-data.service';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import { CHANGE_DETECTION_STRATEGY } from '../../../app.constants';
import { DialogService } from 'primeng/dynamicdialog';
import { ListComponentBase } from '../../../core/component/list.component.base';
import { ConfirmationService } from 'primeng/api';
import { EditComponent } from '../../../core/component/data-modal-edit-component.base';
import { CompanyEditComponent } from '../company-edit/company-edit.component';

const errorMapping: ErrorMessageMapping<Company> = {
  'ForeignKeyConstraintViolationError': {message: 'Item is used'}
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class CompanyListComponent extends ListComponentBase<Company, 'name'> implements OnInit {
  @ViewChild('edit') edit!: CompanyEditComponent;

  companies$!: Observable<Company[]>;
  loading$!: Observable<boolean>;

  constructor(
    private companyDataService: CompanyDataService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {
    super(companyDataService, dialogService, confirmationService, dataServiceErrorMessageService, errorMapping);
  }

  ngOnInit(): void {
    // load
    this.companyDataService.getAll();

    this.companies$ = this.companyDataService.entities$;
    this.loading$ = this.companyDataService.loading$;
  }

  protected getEditComponent(): EditComponent<Company> {
    return this.edit;
  }
  protected getNameOfName(): 'name' {
    return 'name';
  }
}
