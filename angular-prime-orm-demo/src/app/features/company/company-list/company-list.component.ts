import { Component, OnInit } from '@angular/core';
import { Company } from '@app/client-lib';
import { Observable } from 'rxjs';
import { CompanyDataService } from '../store/company-data.service';
import { DataServiceErrorMessageService } from '../../../core/store/data-service-error-message.service';
import { DATE_FORMAT } from 'src/app/core/core.constants';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies$!: Observable<Company[]>;
  loading$!: Observable<boolean>;
  dateFormat = DATE_FORMAT;

  constructor(
    private companyDataService: CompanyDataService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) { }

  ngOnInit(): void {
    // load
    this.companyDataService.getAll();

    this.companies$ = this.companyDataService.entities$;
    this.loading$ = this.companyDataService.loading$;
  }

}
