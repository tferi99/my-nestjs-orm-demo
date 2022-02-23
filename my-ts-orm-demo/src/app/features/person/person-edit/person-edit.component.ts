import {Component, Input, OnInit} from '@angular/core';
import {Company, Person} from '@app/client-lib';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PersonModalComponent} from './person-modal/person-modal.component';
import {PersonDataService} from '../store/person-data.service';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';
import {DataModalEditComponentBase, EditComponent} from '../../../core/component/data-modal-edit-component.base';
import {Observable} from 'rxjs';

const errorMapping: ErrorMessageMapping<Person> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-person-edit',
  template: `<table>
    <tr *ngFor="let c of (companies$ | async)">
      <td>{{c.name}}</td>
    </tr>
  </table>`,
  styles: []
})
export class PersonEditComponent extends DataModalEditComponentBase<Person, any> implements OnInit, EditComponent<Person> {
  @Input() companies$!: Observable<Company[]>;

  constructor(
    private personDataService: PersonDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService

  ) {
    super(PersonModalComponent, personDataService, modalService, dataServiceErrorMessageService, errorMapping);
  }

  ngOnInit(): void {
  }

  dumpCompanies() {
    console.log("COMP:", )
  }
}
