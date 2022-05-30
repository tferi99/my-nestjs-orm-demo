import { DataConverter } from '../../../core/form/DataConverter';
import { Company } from '@app/client-lib';

export class CompanyEditCoverter extends DataConverter<Company> {
  override convert(data: Company): Company {
    return {...data, established: new Date(data.established)};
  }
}
