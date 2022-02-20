import {Company} from '@app/client-lib';
import {FormLoadDto, FormSaveDto} from '../../core/form/form.model';

export interface CompanyLoadDto extends FormLoadDto<Company> {}
export interface CompanySaveDto extends FormSaveDto<Company> {}

