import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '@app/client-lib';
import {CompanyDataService} from './store/company-data.service';
import {DATE_FORMAT} from '../../core/app.constants';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {DialogResult, ModalLoadDto} from '../../core/form/modal/modal.model';
import {take} from 'rxjs/operators';
import {CompanyModalComponent} from './company-modal/company-modal.component';

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
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.companyDataService.getAll();
    this.companies$ = this.companyDataService.entities$;
  }
/*    this.companies = this.route.snapshot.data.companies as Company[];
    console.log('COMPANIES:', this.companies);
    this.route.data.subscribe(
      (data)  => {
        this.companies = data.companies;
        console.log('COMPANIES NEXT:', this.companies);
        this.deleteEnable.next(0);      // send signal to child to enable delete buttons
      }
    );
  }*/

  onNew() {
    this.openEditModal();
  }


  onDelete(p: Company): void {
    if (!p) {
      return;
    }
    this.deleting = true;
/*    this.companyService.delete(p.id).subscribe(
      result => {
        this.toastr.warning(`Company[${p.id}] deleted.`);
        this.router.navigateByUrl('/company');
      }
    );*/
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
    console.log('REF:', ref.content);
    ref.content.out.pipe(take(1)).subscribe((value: DialogResult) => {
      if (value == DialogResult.OK) {
        this.router.navigateByUrl('/user');
      }
    });
  }

}
