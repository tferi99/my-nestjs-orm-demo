
export interface DialogInput<T, A> {
  data?: T,
  additional?: A
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
