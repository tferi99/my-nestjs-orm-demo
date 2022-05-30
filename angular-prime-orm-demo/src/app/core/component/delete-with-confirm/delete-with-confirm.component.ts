import { DataServiceErrorMessageService, ErrorMessageMapping } from '../../store/data-service-error-message.service';
import { EntityCollectionServiceBase } from '@ngrx/data';
import { Confirmation, ConfirmationService } from 'primeng/api';

export abstract class DeleteWithConfirmComponent<T> {

  deleting = false;

  private _dataService: EntityCollectionServiceBase<T>;
  private _confirmationService: ConfirmationService
  private _dataServiceErrorMessageService: DataServiceErrorMessageService;
  private _errorMapping: ErrorMessageMapping<T>;

  abstract getData(): T;
  abstract getName(data: T): string;

  constructor(
    companyDataService: EntityCollectionServiceBase<T>,
    confirmationService: ConfirmationService,
    dataServiceErrorMessageService: DataServiceErrorMessageService,
    errorMapping: ErrorMessageMapping<T>
  ) {
    this._dataService = companyDataService;
    this._confirmationService = confirmationService;
    this._dataServiceErrorMessageService = dataServiceErrorMessageService;
    this._errorMapping = errorMapping;
  }

  delete() {
    if (!this.getData()) {
      console.error('No data specified for <app-delete-with-confirm>');
      return;
    }

    const name = this.getName(this.getData());
    const confirmation: Confirmation = {
      header: 'Delete',
      message: `Do you want to delete '${name}'?`,
      accept: () => {
        this.deleting = true;
        this._dataService.delete(this.getData()).subscribe(
          () => this.deleting = false,
          error => {
            this.deleting = false;
            this._dataServiceErrorMessageService.showErrorMessage(error, this._errorMapping);
          }
        );
      }
    };
    this._confirmationService.confirm(confirmation);

    //***************************************************************
/*    const name = this.getName(this.getData());
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
    });*/
  }
}
