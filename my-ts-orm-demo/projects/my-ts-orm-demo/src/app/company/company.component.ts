import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '@app/my-ts-orm-demo-lib';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companies: Company[];
  deleteEnable = new Subject<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.companies = this.route.snapshot.data.companies as Company[];
    console.log('COMPANIES:', this.companies);
    this.route.data.subscribe(
      (data)  => {
        this.companies = data.companies;
        console.log('COMPANIES NEXT:', this.companies);
        this.deleteEnable.next(0);      // send signal to child to enable delete buttons
      }
    );
  }
}
