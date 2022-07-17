import { Observable, Subject } from 'rxjs';

export interface FormDataConfig<T, A> {
  inputData?: T,
  additionalInputData?: A
  outputDataStream?: Subject<FormOutputData<T>>,     // stream for pushing output
}

export interface FormOutputData<T> {
  data: T;
  isNew: boolean;
}

