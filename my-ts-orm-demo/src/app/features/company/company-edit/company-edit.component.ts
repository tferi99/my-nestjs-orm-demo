import {Component, OnInit} from '@angular/core';
import {Company} from '@app/client-lib';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {ModalLoadDto, ModalResult} from '../../../core/form/modal/modal.model';
import {CompanyModalComponent} from './company-modal/company-modal.component';
import {CompanyDataService} from '../store/company-data.service';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';

const errorMapping: ErrorMessageMapping<Company> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  constructor(
    private companyDataService: CompanyDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) { }

  ngOnInit(): void {
  }

  onNew() {
    this.openEditModal();
  }

  onCopy(company: Company): void  {
    const copy: Company = {...company};
    // @ts-ignore
    delete copy['id'];
    this.openEditModal(copy);
  }

  onEdit(company: Company): void  {
    this.openEditModal(company);
  }

  openEditModal(company?: Company) {
    const initialState: ModalOptions<ModalLoadDto<Company>> = {
      initialState: {
        in: company
      }
    };
    //console.log('DIALOG: ', initialState);
    const ref: BsModalRef = this.modalService.show(CompanyModalComponent, initialState);
    ref.content.out.subscribe((out: ModalResult<Company>) => {
        console.log('Dialog returns:', out);
        if (out.isNew) {
          this.companyDataService.add(out.data).subscribe(
            () => ref.hide(),
            error => {
              this.dataServiceErrorMessageService.showErrorMessage(error, errorMapping);
            }
          );
        } else {
          this.companyDataService.update(out.data).subscribe(
            () => ref.hide(),
            error => {
              this.dataServiceErrorMessageService.showErrorMessage(error, errorMapping);
            }
          );
        }
      }
    );
  }
}
