import { Observable, Subject } from 'rxjs';

export interface DialogCallInfo<T, A> {
  inputData?: T,
  additionalInput?: A
  outputData: Subject<DialogOutput<T>>,
  isNew: boolean;
}

export interface DialogOutput<T> {
  data: T;
  isNew: boolean;
}

export const MODAL_TRACE = true;
export const MODAL_TRACE_PREFIX = '[MODAL] - ';

export const modalTraceLog = (...args: any[]) => {
  if (MODAL_TRACE) {
    const first = args.shift();
    if(first) {
      console.log(MODAL_TRACE_PREFIX + first, args);
    }
  }
}
