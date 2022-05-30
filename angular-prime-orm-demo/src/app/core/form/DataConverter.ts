export abstract class DataConverter<T> {
  abstract convert(data: T): T;
}
