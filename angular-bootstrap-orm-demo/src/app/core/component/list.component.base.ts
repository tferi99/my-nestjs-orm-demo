import {Observable} from 'rxjs';
import {DATE_FORMAT} from '../core.constants';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {DialogResult} from '../form/modal/modal.model';
import {take} from 'rxjs/operators';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../store/data-service-error-message.service';
import {ConfirmDialogComponent, ConfirmDialogConfig} from '../form/modal/confirm-dialog/confirm-dialog.component';
import {EditComponent} from './data-modal-edit-component.base';
import {EntityCollectionServiceBase} from '@ngrx/data';

export abstract class ListComponentBase<T, NAME extends keyof T> {
  deleting = false;
  enabledDump = false;

  dateFormat = DATE_FORMAT;

  protected abstract getEditComponent(): EditComponent<T>;
  protected abstract getNameOfName(): NAME;

  _dataService: EntityCollectionServiceBase<T>;
  _modalService: BsModalService;
  _dataServiceErrorMessageService: DataServiceErrorMessageService;
  errorMapping?: ErrorMessageMapping<T>;

  constructor(
    dataService: EntityCollectionServiceBase<T>,
    modalService: BsModalService,
    dataServiceErrorMessageService: DataServiceErrorMessageService,
    errorMapping?: ErrorMessageMapping<T>
  ) {
    this._dataService = dataService;
    this._modalService = modalService;
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
        this._dataService.delete(data).subscribe(
          () => this.deleting = false,
          error => {
            this.deleting = false;
            this._dataServiceErrorMessageService.showErrorMessage(error, this.errorMapping);
          }
        );
      }
    });
  }

  onDump(data: T) {
    console.log('DUMP:', data);
  }

}
