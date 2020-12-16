import { Component, OnInit } from '@angular/core';
import {CompanyDto} from 'my-typeorm-demo-lib';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonService} from '../person/person.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companies: CompanyDto[];
  deleteEnable = new Subject<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.companies = this.route.snapshot.data.persons as CompanyDto[];
    this.route.data.subscribe(
      (data)  => {
        this.companies = data.companies;
        this.deleteEnable.next(0);      // send signal to child to enable delete buttons
      }
    );
  }
}
