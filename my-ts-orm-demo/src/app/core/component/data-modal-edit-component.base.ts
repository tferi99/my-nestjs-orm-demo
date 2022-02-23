import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {ModalLoadDto, ModalResult} from '../form/modal/modal.model';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../store/data-service-error-message.service';
import {EntityCollectionServiceBase} from '@ngrx/data';
import {ComponentType} from 'ngx-toastr';

/**
 * Base component to render modal form for to edit data using NgRx Data service.
 */
export abstract class DataModalEditComponentBase<T> {
  constructor(
    private _dataService: EntityCollectionServiceBase<T>,
    private _modalService: BsModalService,
    private _dataServiceErrorMessageService: DataServiceErrorMessageService,
    private _errorMapping: ErrorMessageMapping<T>,
    private _modalComponentType: ComponentType<ModalLoadDto<T>>
  ) { }

  onNew() {
    this.openEditModal();
  }

  onCopy(data: T): void  {
    const copy: T = {...data};
    // @ts-ignore
    delete copy['id'];
    this.openEditModal(copy);
  }

  onEdit(data: T): void  {
    this.openEditModal(data);
  }

  openEditModal(data?: T) {
    const modalOptions: ModalOptions<ModalLoadDto<T>> = {
      initialState: {
        in: data
      }
    };
    //console.log('DIALOG: ', initialState);
    const ref: BsModalRef = this._modalService.show(this._modalComponentType, modalOptions);
    ref.content.out.subscribe((out: ModalResult<T>) => {
        console.log('Dialog returns:', out);
        if (out.isNew) {
          this._dataService.add(out.data).subscribe(
            () => ref.hide(),
            error => {
              this._dataServiceErrorMessageService.showErrorMessage(error, this._errorMapping);
            }
          );
        } else {
          this._dataService.update(out.data).subscribe(
            () => ref.hide(),
            error => {
              this._dataServiceErrorMessageService.showErrorMessage(error, this._errorMapping);
            }
          );
        }
      }
    );
  }
}
