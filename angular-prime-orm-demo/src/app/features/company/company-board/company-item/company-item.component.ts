import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OneToManyAssociation } from '../../../../core/store/store-utils';
import { Company, Person } from '@app/client-lib';
import { COMPANY_ID_RUBBISH_BIN, COMPANY_ID_UNEMPLOYED } from '../../company.constants';
import { DragDropAction } from '../../drag-drop-service.base';
import { DragDropService } from '../../drag-drop.service';
import { CompanyEditAdapterComponent } from '../../company-edit/company-edit-adapter.component';
import { PersonEditAdapterComponent } from '../../../person/person-edit/person-edit-adapter.component';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent implements OnInit {
  @Input() companies!: OneToManyAssociation<Company, Person>[] | null;
  @Input() handler!: DragDropService;
  @Input() companyEdit!: CompanyEditAdapterComponent;
  @Input() personEdit!: PersonEditAdapterComponent;

  COMPANY_ID_RUBBISH_BIN = COMPANY_ID_RUBBISH_BIN.toString();
  dragDropActionEnum = DragDropAction;

  constructor() { }

  ngOnInit(): void {
  }

  getHeaderForCompany(company: Company): string {
    if (this.isTargetNormal(company.id)) {
      return `[${company.id}] - ${company.name}`;
    }
    if (this.isTargetUnemployed(company.id)) {
      return 'UNEMPLOYED'
    };
    return '';
  }

  isTargetNormal(companyId: number): boolean {
    return companyId >= 0;
  }

  isTargetRubbishBin(companyId: number): boolean {
    return companyId === COMPANY_ID_RUBBISH_BIN;
  }

  isTargetUnemployed(companyId: number): boolean {
    return companyId === COMPANY_ID_UNEMPLOYED;
  }

  getClassByCompany(company: Company): string {
    switch (company.id) {
      case COMPANY_ID_UNEMPLOYED:
        return "unemployed-panel";
      case COMPANY_ID_RUBBISH_BIN:
        return "rubbish-panel";
      default:
        return company.active ? "company-panel" : '';
    }
  }

  editCompany(company: Company) {
    this.companyEdit.onEdit(company);
  }

  addPerson() {
    console.log('pppp');
    this.personEdit.onNew();
  }

}
