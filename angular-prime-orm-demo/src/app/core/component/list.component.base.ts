import { DATE_FORMAT } from '../core.constants';
import { DataServiceErrorMessageService, ErrorMessageMapping } from '../store/data-service-error-message.service';
import { EntityCollectionServiceBase } from '@ngrx/data';
import { DialogService } from 'primeng/dynamicdialog';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { EditComponent } from './modal-edit-adapter.base';

/**
 * Provides common features of a list of items:
 * - add new list item by calling an edit component with {@link onNew}
 * - edit list item by calling an edit component with {@link onEdit}
 * - delete a list item by calling a confirmation and NgRX entity collection service {@link onDelete}
 *
 * Edit component can be rendered here (e.g. a modal dialog or in-place editor) - no routing involved.
 */
export abstract class ListComponentBase<T, NAME extends keyof T> {
  deleting = false;
  enabledDump = true;

  dateFormat = DATE_FORMAT;

  protected abstract getEditComponent(): EditComponent<T>;  // used for calling new/edit/copy
  protected abstract getNameOfName(): NAME;     // used for Delete confirmation

  _dataService: EntityCollectionServiceBase<T>;
  _dialogService: DialogService;
  _confirmationService: ConfirmationService;
  _dataServiceErrorMessageService: DataServiceErrorMessageService;
  errorMapping?: ErrorMessageMapping<T>;

  constructor(
    dataService: EntityCollectionServiceBase<T>,
    dialogService: DialogService,
    confirmationService: ConfirmationService,
    dataServiceErrorMessageService: DataServiceErrorMessageService,
    errorMapping?: ErrorMessageMapping<T>
  ) {
    this._dataService = dataService;
    this._dialogService = dialogService;
    this._confirmationService = confirmationService;
    this._dataServiceErrorMessageService = dataServiceErrorMessageService;
    this.errorMapping = errorMapping;
  }

  onNew() {
    this.getEditComponent().onNew();
  }

  onCopy(data: T): void  {
    const copy: T = {...data};
    // @ts-ignore
    delete copy['id'];
    this.getEditComponent().onCopy(copy);
  }

  onEdit(data: T): void  {
    this.getEditComponent().onEdit(data);
  }

  onDelete(data: T): void {
    if (!data) {
      return;
    }

    const name = data !== undefined ? data[this.getNameOfName()] : '';
    const confirmation: Confirmation = {
      header: 'Delete',
      message: `Do you want to delete '${name}'?`,
      accept: () => {
        this.deleting = true;
        this._dataService.delete(data).subscribe(
          () => this.deleting = false,
          error => {
            this.deleting = false;
            this._dataServiceErrorMessageService.showErrorMessage(error, this.errorMapping);
          }
        );
      }
    };
    this._confirmationService.confirm(confirmation);
  }

  onDump(data: T) {
    console.log('DUMP:', data);
  }
}
