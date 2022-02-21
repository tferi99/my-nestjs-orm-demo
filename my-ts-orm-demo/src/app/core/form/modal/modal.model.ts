export enum DialogResult {
  OK = 'OK',
  CANCEL = 'CANCEL'
}

export interface ModalResult<T> {
  command: DialogResult | string;
  data: T;
}

export interface ModalLoadDto<T> {
  in: T;
}

