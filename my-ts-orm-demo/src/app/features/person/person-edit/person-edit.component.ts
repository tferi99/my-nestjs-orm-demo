import {Component, OnInit} from '@angular/core';
import {Company, Person} from '@app/client-lib';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PersonModalComponent} from './person-modal/person-modal.component';
import {PersonDataService} from '../store/person-data.service';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';
import {DataModalEditComponentBase, EditComponent} from '../../../core/component/data-modal-edit-component.base';

const errorMapping: ErrorMessageMapping<Person> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-person-edit',
  template: ``,
  styles: []
})
export class PersonEditComponent extends DataModalEditComponentBase<Person> implements OnInit, EditComponent<Person> {
  constructor(
    private personDataService: PersonDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService

  ) {
    super(PersonModalComponent, personDataService, modalService, dataServiceErrorMessageService, errorMapping);
  }

  ngOnInit(): void {
  }
}
