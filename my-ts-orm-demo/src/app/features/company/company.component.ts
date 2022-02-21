import {Component, OnInit} from '@angular/core';
import {noop, Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '@app/client-lib';
import {CompanyDataService} from './store/company-data.service';
import {DATE_FORMAT} from '../../core/app.constants';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {DialogResult, ModalLoadDto, ModalResult} from '../../core/form/modal/modal.model';
import {take} from 'rxjs/operators';
import {CompanyModalComponent} from './company-modal/company-modal.component';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../core/store/data-service-error-message.service';
import {UniqueConstraintError} from '../../core/error/app-error';

const errorMapping: ErrorMessageMapping<Company> = {
  'UniqueConstraintError' : {message: ': already exists', resolver: (data => data.name)}
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companies$!: Observable<Company[]>;
  deleteEnable: Observable<number> = new Subject<number>();
  deleting = false;

  dateFormat = DATE_FORMAT;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyDataService: CompanyDataService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) {
  }

  ngOnInit(): void {
    this.companyDataService.getAll();
    this.companies$ = this.companyDataService.entities$;
  }

  onNew() {
    this.openEditModal();
  }

  onDelete(company: Company): void {
    if (!company) {
      return;
    }
    this.deleting = true;
    this.companyDataService.delete(company).subscribe(
      () => this.deleting = false,
      error => this.deleting = false
    );
  }

  onCopy(p: Company): void  {
    // @ts-ignore
    p.id = undefined;
    this.router.navigateByUrl('/company/new', {state: p});
  }

  openEditModal(company?: Company) {
    const initialState: ModalOptions<ModalLoadDto<Company>> = {
      initialState: {
        in: company
      }
    };
    const ref: BsModalRef = this.modalService.show(CompanyModalComponent, initialState);
    ref.content.out.subscribe((out: ModalResult<Company>) => {
        console.log('Dialog returns:', out);
        this.companyDataService.add(out.data).subscribe(
          () => ref.hide(),
          error => {
            console.log('ERROR IN NGRX DATA: ', error);
            this.dataServiceErrorMessageService.showErrorMessage(error, errorMapping);
          }
        );
      }
    );
  }
}
