import {ConfirmDialogComponent, ConfirmDialogConfig} from '../../form/modal/confirm-dialog/confirm-dialog.component';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {take} from 'rxjs/operators';
import {DialogResult} from '../../form/modal/modal.model';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../store/data-service-error-message.service';
import {EntityCollectionServiceBase} from '@ngrx/data';

export abstract class DeleteWithConfirmComponent<T> {

  deleting = false;

  private _dataService: EntityCollectionServiceBase<T>;
  private _modalService: BsModalService;
  private _dataServiceErrorMessageService: DataServiceErrorMessageService;
  private _errorMapping: ErrorMessageMapping<T>;

  abstract getData(): T;
  abstract getName(data: T): string;

  constructor(
    companyDataService: EntityCollectionServiceBase<T>,
    modalService: BsModalService,
    dataServiceErrorMessageService: DataServiceErrorMessageService,
    errorMapping: ErrorMessageMapping<T>
  ) {
    this._dataService = companyDataService;
    this._modalService = modalService;
    this._dataServiceErrorMessageService = dataServiceErrorMessageService;
    this._errorMapping = errorMapping;
  }

  delete() {
    if (!this.getData()) {
      console.error('No data specified for <app-delete-with-confirm>');
      return;
    }

    const name = this.getName(this.getData());
    const config: ConfirmDialogConfig = {
      message: `Do you want to delete '${name}'?`
    };

    const dialogConfig: ModalOptions = {
      initialState: {
        config
      }
    }

    const ref: BsModalRef = this._modalService.show(ConfirmDialogComponent, dialogConfig);
    ref.content.action.pipe(take(1)).subscribe((value: DialogResult) => {
      if (value == DialogResult.OK) {
        this.deleting = true;
        this._dataService.delete(this.getData()).subscribe(
          () => this.deleting = false,
          error => {
            this.deleting = false;
            this._dataServiceErrorMessageService.showErrorMessage(error, this._errorMapping);
          }
        );
      }
    });
  }
}
