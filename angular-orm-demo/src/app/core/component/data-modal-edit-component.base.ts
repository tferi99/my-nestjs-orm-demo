import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {ModalLoadDto, ModalResult} from '../form/modal/modal.model';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../store/data-service-error-message.service';
import {EntityCollectionServiceBase} from '@ngrx/data';
import {ComponentType} from 'ngx-toastr';

export interface EditComponent<T> {
  onNew(): void;
  onCopy(data: T): void;
  onEdit(data: T): void;
}

/**
 * Base component to render modal form for to edit data using NgRx Data service.
 *    T:  type edited
 *    A:  additional data
 */
export abstract class DataModalEditComponentBase<T, A> {
  /**
   * Pass this values from constructor of inherited class:
   *
   * @param _modalComponentType component type of model form
   * @param _dataService NgRx Data service
   * @param _modalService ngx-bootstrap modal service
   * @param _dataServiceErrorMessageService error message generator service
   * @param _errorMapping error code-message mapping
   */
  constructor(
    private _modalComponentType: ComponentType<ModalLoadDto<T, A>>,
    private _dataService: EntityCollectionServiceBase<T>,
    private _modalService: BsModalService,
    private _dataServiceErrorMessageService: DataServiceErrorMessageService,
    private _errorMapping: ErrorMessageMapping<T>
  ) { }

  abstract getAdditional(): A;
  abstract beforeSave(data: T): void;

  onNew(): void {
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
    const modalOptions: ModalOptions<ModalLoadDto<T, A>> = {
      initialState: {
        in: data,
        additional: this.getAdditional()
      }
    };
    //console.log('DIALOG: ', initialState);
    const ref: BsModalRef = this._modalService.show(this._modalComponentType, modalOptions);
    ref.content.out.subscribe((out: ModalResult<T>) => {
        console.log('Dialog returns:', out);

        this.beforeSave(out.data);

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