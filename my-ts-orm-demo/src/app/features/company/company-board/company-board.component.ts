import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {CompanyDataService} from '../store/company-data.service';
import {Company} from '@app/client-lib';
import {PersonDataService} from '../../person/store/person-data.service';

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
  loading$ = this.companyDataService.loading$;

  constructor(
    private companyDataService: CompanyDataService,
    private personDataService: PersonDataService
  ) {}

  ngOnInit(): void {
    this.companyDataService.getAll();
    this.personDataService.getAll();

    this.companies$ =  this.companyDataService.entities$;
  }
}
