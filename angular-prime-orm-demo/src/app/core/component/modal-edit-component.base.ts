import { DialogInput, DialogOutput } from '../form/modal/modal.model';
import { DataServiceErrorMessageService, ErrorMessageMapping } from '../store/data-service-error-message.service';
import { EntityCollectionServiceBase } from '@ngrx/data';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Type } from '@angular/core';
import { ModalComponentBase } from './modal.component.base';

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
export abstract class ModalEditComponentBase<T, A> {
  private _dialogComponentType: Type<ModalComponentBase<T, A, keyof T>>;
  private _dataService: EntityCollectionServiceBase<T>;
  private _dialogService: DialogService;
  private _dataServiceErrorMessageService: DataServiceErrorMessageService;
  private _errorMapping: ErrorMessageMapping<T>;
  private _additionalDialogOptions: Partial<DynamicDialogConfig> | undefined;
  private entityName : string;
  /**
   * Pass this values from constructor of inherited class:
   *
   * @param dialogComponentType component type of model form
   * @param dataService NgRx Data service
   * @param dialogService PrimeNG modal service
   * @param dataServiceErrorMessageService error message generator service
   * @param errorMapping error code-message mapping
   * @param additionalDialogOptions additional dialog options
   */
  constructor(
    entityName: string,
    dialogComponentType: Type<ModalComponentBase<T, A, keyof T>>,
    dataService: EntityCollectionServiceBase<T>,
    dialogService: DialogService,
    dataServiceErrorMessageService: DataServiceErrorMessageService,
    errorMapping: ErrorMessageMapping<T>,
    additionalDialogOptions?: Partial<DynamicDialogConfig>
  ) {
    this.entityName = entityName;
    this._dialogComponentType = dialogComponentType;
    this._dataService = dataService;
    this._dialogService = dialogService;
    this._dataServiceErrorMessageService = dataServiceErrorMessageService;
    this._errorMapping = errorMapping;
    this._additionalDialogOptions = additionalDialogOptions;

  }

  abstract getAdditionalData(): A;
  abstract beforeSave(data: T): void;

  onNew(additionalDialogOptions?: Partial<DynamicDialogConfig>): void {
    this.openEditModal({isNew: true}, {
      ...additionalDialogOptions,
      header: 'New ' + this.entityName
    });
  }

  onCopy(data: T, additionalDialogOptions?: Partial<DynamicDialogConfig>): void  {
    const copy: T = {...data};
    // @ts-ignore
    delete copy['id'];
    this.openEditModal({
      data: copy,
      additional: undefined,
      isNew: true
    });
  }

  onEdit(data: T, additionalDialogOptions?: Partial<DynamicDialogConfig>): void  {
    this.openEditModal({
      data,
      isNew: false
    }, {
      ...additionalDialogOptions,
      header: 'Edit ' + this.entityName
    });
  }

  openEditModal(dialogInputData: DialogInput<T, A>, additionalDialogOptions?: Partial<DynamicDialogConfig>) {
    const extendedAdditionalData: A = {
      ...dialogInputData.additional, ...this.getAdditionalData()
    }
    const extendedeDialogInputData: DialogInput<T, A> = {
      ...dialogInputData,
      additional: extendedAdditionalData
    }
    const modalOptions: DynamicDialogConfig = {
      data: extendedeDialogInputData,
      width: '80%',
      ...this._additionalDialogOptions,
      ...additionalDialogOptions
    };
    console.log('DIALOG init: ', modalOptions);
    const ref: DynamicDialogRef = this._dialogService.open(this._dialogComponentType, modalOptions);
    ref.onClose.subscribe((out: DialogOutput<T>) => {
        console.log('Dialog returns:', out);

        this.beforeSave(out.data);

        if (out.isNew) {
          this._dataService.add(out.data).subscribe(
            () => ref.close(),
            error => {
              this._dataServiceErrorMessageService.showErrorMessage(error, this._errorMapping);
            }
          );
        } else {
          this._dataService.update(out.data).subscribe(
            () => ref.close(),
            error => {
              this._dataServiceErrorMessageService.showErrorMessage(error, this._errorMapping);
            }
          );
        }
      }
    );
  }
}