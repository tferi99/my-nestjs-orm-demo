import { Injectable } from '@angular/core';
import {DataServiceError} from '@ngrx/data';
import {ForeignKeyConstraintViolationError, UniqueConstraintError} from '../error/app-error';
import { ToastrService } from '../../prime-core/service/toastr.service';

/**
 * It retrieves data from error.
 */
export interface ErrorDataRetriever<T> {
  (data: T): string
}

export interface ErrorMessageMappingItem<T> {
  message: string;
  retriever?: ErrorDataRetriever<T>
}

export interface ErrorMessageMapping<T> {
  [key: string]: ErrorMessageMappingItem<T>
}

@Injectable({
  providedIn: 'root'
})
export class DataServiceErrorMessageService {
  constructor(
    private toastr: ToastrService
  ) { }

  showErrorMessage<T>(error: any, mapping?: ErrorMessageMapping<T>) {
    let message: string;
    if (error instanceof DataServiceError) {
      const dataServiceErr = error as DataServiceError;
      if (mapping) {
        const errType = dataServiceErr?.error?.constructor.name;
        console.log('Error type: ', errType);
        const mappingItem = mapping[errType];
        if (!mappingItem) {
          this.toastr.error('Unidentified DataServiceError error: ' + error.message);
        } else {
          if (dataServiceErr.error instanceof UniqueConstraintError || dataServiceErr.error instanceof ForeignKeyConstraintViolationError) {
            let msg = '';
            if (mappingItem.retriever && dataServiceErr.requestData?.data) {
              const data: T = dataServiceErr.requestData.data;
              msg = mappingItem.retriever(data) + ' : ' + mappingItem.message;
            } else {
              msg = mappingItem.message;
            }
            this.toastr.error(msg);
          } else {
            this.toastr.error('Unsupported error type found: ' + error.message);
          }
        }
      } else {
        this.toastr.error('Unidentified DataServiceError (no mapping): ' + error.message);
      }
    } else {
      this.toastr.error('Not DataServiceError: ' + error.message);
    }
  }
}

