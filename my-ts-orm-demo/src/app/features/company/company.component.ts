import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '@app/client-lib';
import {CompanyDataService} from './store/company-data.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companies$!: Observable<Company[]>;
  deleteEnable: Observable<number> = new Subject<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private companyDataService: CompanyDataService,
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
}
