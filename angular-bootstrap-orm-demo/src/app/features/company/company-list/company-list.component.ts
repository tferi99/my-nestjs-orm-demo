import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Company} from '@app/client-lib';
import {CompanyDataService} from '../store/company-data.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import {CompanyEditComponent} from '../company-edit/company-edit.component';
import {ListComponentBase} from '../../../core/component/list.component.base';
import {EditComponent} from 'src/app/core/component/modal-edit-component.base';
import {CHANGE_DETECTION_STRATEGY} from '../../../app.constants';

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
      private modalService: BsModalService,
      private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) {
    super(companyDataService, modalService, dataServiceErrorMessageService, errorMapping);
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
