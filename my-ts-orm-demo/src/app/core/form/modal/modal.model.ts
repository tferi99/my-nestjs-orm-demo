export enum DialogResult {
  OK = 'OK',
  CANCEL = 'CANCEL'
}

export interface ModalResult<T> {
  command: DialogResult | string;
  data: Partial<T>;
}

export interface ModalLoadDto<T> {
  in: T;
}

