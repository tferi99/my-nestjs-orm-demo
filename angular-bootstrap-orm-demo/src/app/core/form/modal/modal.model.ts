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

