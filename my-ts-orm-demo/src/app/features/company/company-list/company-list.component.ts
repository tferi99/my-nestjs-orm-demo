import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Company} from '@app/client-lib';
import {CompanyDataService} from '../store/company-data.service';
import {DATE_FORMAT} from '../../../core/app.constants';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {DialogResult} from '../../../core/form/modal/modal.model';
import {take} from 'rxjs/operators';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';
import {ConfirmDialogComponent, ConfirmDialogConfig} from '../../../core/form/modal/confirm-dialog/confirm-dialog.component';
import {CompanyEditComponent} from '../company-edit/company-edit.component';

const errorMapping: ErrorMessageMapping<Company> = {
  'ForeignKeyConstraintViolationError' : {message: 'Item is used'}
}

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  @ViewChild('edit') edit!: CompanyEditComponent;

  loading$!: Observable<boolean>;
  companies$!: Observable<Company[]>;
  deleteEnable: Observable<number> = new Subject<number>();
  deleting = false;

  dateFormat = DATE_FORMAT;

  constructor(
    private companyDataService: CompanyDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) {
  }

  ngOnInit(): void {
    this.companyDataService.getAll();
    this.companies$ = this.companyDataService.entities$;
    this.loading$ = this.companyDataService.loading$;
  }

  onNew() {
    this.edit.onNew();
  }

  onCopy(company: Company): void  {
    const copy: Company = {...company};
    // @ts-ignore
    delete copy['id'];
    this.edit.onCopy(copy);
  }

  onEdit(company: Company): void  {
    this.edit.onEdit(company);
  }

  onDelete(company: Company): void {
    if (!company) {
      return;
    }

    const config: ConfirmDialogConfig = {
      message: `Do you want to delete '${company?.name}'?`
    };

    const dialogConfig: ModalOptions = {
      initialState: {
        config
      }
    }

    const ref: BsModalRef = this.modalService.show(ConfirmDialogComponent, dialogConfig);
    ref.content.action.pipe(take(1)).subscribe((value: DialogResult) => {
      if (value == DialogResult.OK) {
        this.deleting = true;
        this.companyDataService.delete(company).subscribe(
          () => this.deleting = false,
          error => {
            this.deleting = false;
            this.dataServiceErrorMessageService.showErrorMessage(error, errorMapping);
          }
        );
      }
    });
  }
}
