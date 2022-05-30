import { DialogCallInfo, DialogOutput, modalTraceLog } from '../form/modal/modal.model';
import { DataServiceErrorMessageService, ErrorMessageMapping } from '../store/data-service-error-message.service';
import { EntityCollectionServiceBase } from '@ngrx/data';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, OnDestroy, OnInit, Type } from '@angular/core';
import { ModalEditComponentBase } from './modal-edit-component.base';
import { Subject, Subscription } from 'rxjs';
import { DataConverter } from '../form/DataConverter';

export interface EditComponent<T> {
  onNew(): void;
  onCopy(data: T): void;
  onEdit(data: T): void;
}

const DEFAULT_DIALOG_PROPERTIES: Partial<DynamicDialogConfig> = {
  width: '70%',
  contentStyle: {"overflow": "hidden"},
  dismissableMask: true
}

/**
 * Base component to render modal form for to edit data using NgRx Data service.
 *    T:  type edited
 *    A:  additional data
 */
export abstract class ModalEditAdapterBase<T, A> {
  private _dialogComponentType: Type<ModalEditComponentBase<T, A, keyof T>>;
  private _dataService: EntityCollectionServiceBase<T>;
  private _dialogService: DialogService;
  private _dataServiceErrorMessageService: DataServiceErrorMessageService;
  private _errorMapping: ErrorMessageMapping<T>;
  private _additionalDialogOptions: Partial<DynamicDialogConfig> | undefined;
  private entityName : string;
  private result: Subject<DialogOutput<T>> = new Subject<DialogOutput<T>>();
  private resultSub?: Subscription;

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
    dialogComponentType: Type<ModalEditComponentBase<T, A, keyof T>>,
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
    this._additionalDialogOptions = {...DEFAULT_DIALOG_PROPERTIES, ...additionalDialogOptions};

  }

  abstract getAdditionalData(): A;
  abstract beforeSave(data: T): void;
  abstract getEditConverter(): DataConverter<T>;

  onNew(additionalDialogOptions?: Partial<DynamicDialogConfig>): void {
    this.openEditModal({
      outputData: this.result,
      isNew: true
    }, {
    ...additionalDialogOptions,
      header: 'New ' + this.entityName
    });
  }

  onCopy(data: T, additionalDialogOptions?: Partial<DynamicDialogConfig>): void  {
    const copy: T = {...data};
    // @ts-ignore
    delete copy['id'];
    this.openEditModal({
      inputData: copy,
      additionalInput: undefined,
      outputData: this.result,
      isNew: true
    });
  }

  onEdit(data: T, additionalDialogOptions?: Partial<DynamicDialogConfig>): void  {
    const converter = this.getEditConverter();

    this.openEditModal({
      inputData: converter ? converter.convert(data) : data,
      outputData: this.result,
      isNew: false
    }, {
      ...additionalDialogOptions,
      header: 'Edit ' + this.entityName
    });
  }

  private openEditModal(dialogInputData: DialogCallInfo<T, A>, additionalDialogOptions?: Partial<DynamicDialogConfig>) {

    const extendedAdditionalData: A = {
      ...dialogInputData.additionalInput, ...this.getAdditionalData()
    }
    const extendedDialogInputData: DialogCallInfo<T, A> = {
      ...dialogInputData,
      additionalInput: extendedAdditionalData
    }
    const modalOptions: DynamicDialogConfig = {
      data: extendedDialogInputData,
      width: '80%',
      ...this._additionalDialogOptions,
      ...additionalDialogOptions,
    };
    modalTraceLog('openEditModal() DIALOG init: ', modalOptions);

    this.unsubscribeResult();
    const ref: DynamicDialogRef = this._dialogService.open(this._dialogComponentType, modalOptions);
    this.initResultHandler(ref);
  }

  private initResultHandler(ref: DynamicDialogRef): void {
    this.resultSub = this.result.subscribe(
      (out: DialogOutput<T>) => {
        modalTraceLog('Result dialog:', out);
        if (!out.data) {
          ref.close();
          return;
        }
        this.beforeSave(out.data);

        if (out.isNew) {
          this._dataService.add(out.data).subscribe(
            () => {
              ref.close();
            },
            error => {
              this._dataServiceErrorMessageService.showErrorMessage(error, this._errorMapping);
            }
          );
        } else {
          this._dataService.update(out.data).subscribe(
            () => {
              ref.close();
            },
            error => {
              this._dataServiceErrorMessageService.showErrorMessage(error, this._errorMapping);
            }
          );
        }
      }
    );
  }

  private unsubscribeResult() {
    if (this.resultSub) {
      this.resultSub.unsubscribe();
      this.resultSub = undefined;
    }
  }

  protected cleanup() {
    this.unsubscribeResult();
  }
}
