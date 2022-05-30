import { Person } from '@app/client-lib';
import { DataConverter } from '../../../core/form/DataConverter';

export class PersonEditConverter extends DataConverter<Person> {
  convert(data: Person): Person {
    return {...data, birth: new Date(data.birth)};
  }
}
