import {Component, Input} from '@angular/core';
import {Person} from '@app/client-lib';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';
import {DeleteWithConfirmComponent} from '../../../core/component/delete-with-confirm/delete-with-confirm.component';
import {PersonDataService} from '../../../features/person/store/person-data.service';
import { ConfirmationService } from 'primeng/api';

const errorMapping: ErrorMessageMapping<Person> = {
}

@Component({
  selector: 'app-person-delete',
  templateUrl: '../../../core/component/delete-with-confirm/delete-with-confirm.component.html',
  styleUrls: ['../../../core/component/delete-with-confirm/delete-with-confirm.component.scss',]
})
export class PersonDeleteComponent extends DeleteWithConfirmComponent<Person> {
  @Input() data!: Person;

  constructor(
    private personDataService: PersonDataService,
    confirmationService: ConfirmationService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) {
    super(personDataService, confirmationService, dataServiceErrorMessageService, errorMapping);
  }

  getName(data: Person): string {
    return data.name;
  }

  getData(): Person {
    return this.data;
  }
}
