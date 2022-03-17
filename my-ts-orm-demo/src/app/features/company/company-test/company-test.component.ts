import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-test',
  templateUrl: './company-test.component.html',
  styleUrls: ['./company-test.component.scss']
})
export class CompanyTestComponent implements OnInit {
  companies: string[] = [
    'Test1', 'Test2'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
