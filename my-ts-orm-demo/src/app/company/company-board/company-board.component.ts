import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {CompanyDataService} from '../store/company-data.service';
import {Company} from '@app/client-lib';

const comps: Company[] = [
  { id:0, name: 'Abc', note: 'aaaa', active: true, created: new Date(), updated: new Date(), established: new Date(), workers: [] },
  { id:1, name: 'Abc1', note: 'aaaa1', active: true, created: new Date(), updated: new Date(), established: new Date(), workers: [] },
];

@Component({
  selector: 'app-company-board',
  templateUrl: './company-board.component.html',
  styleUrls: ['./company-board.component.scss']
})
export class CompanyBoardComponent implements OnInit {
  companies$!: Observable<Company[]>;
  //companies$: Observable<Company[]> = of(comps);

  constructor(private companyDataService: CompanyDataService) {}

  ngOnInit(): void {
    this.companyDataService.getAll();
    this.companies$ = this.companyDataService.populatedCompanies$;
  }
}
