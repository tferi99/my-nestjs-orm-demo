export enum DialogResult {
  OK = 'OK',
  CANCEL = 'CANCEL'
}

export interface ModalResult<T> {
  command: DialogResult | string;
  isNew: boolean;
  data: T;
}

export interface ModalLoadDto<T, A> {
  in: T;
  additional: A
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
