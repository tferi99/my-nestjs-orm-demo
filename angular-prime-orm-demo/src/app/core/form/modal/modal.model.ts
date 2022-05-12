
export interface DialogInput<T, A> {
  data?: T,
  additional?: A
  isNew: boolean;
}

export interface DialogOutput<T> {
  data: T;
  isNew: boolean;
}

