import {Component, OnInit} from '@angular/core';
import {Person} from '@app/client-lib';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {ModalLoadDto, ModalResult} from '../../../core/form/modal/modal.model';
import {PersonModalComponent} from './person-modal/person-modal.component';
import {PersonDataService} from '../store/person-data.service';
import {DataServiceErrorMessageService, ErrorMessageMapping} from '../../../core/store/data-service-error-message.service';

const errorMapping: ErrorMessageMapping<Person> = {
  'UniqueConstraintError' : {message: 'already exists', retriever: (data => data.name)},
}

@Component({
  selector: 'app-person-edit',
  templateUrl: './Person-edit.component.html',
  styleUrls: ['./Person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  constructor(
    private PersonDataService: PersonDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) { }

  ngOnInit(): void {
  }

  onNew() {
    this.openEditModal();
  }

  onCopy(Person: Person): void  {
    const copy: Person = {...Person};
    // @ts-ignore
    delete copy['id'];
    this.openEditModal(copy);
  }

  onEdit(Person: Person): void  {
    this.openEditModal(Person);
  }

  openEditModal(Person?: Person) {
    const initialState: ModalOptions<ModalLoadDto<Person>> = {
      initialState: {
        in: Person
      }
    };
    //console.log('DIALOG: ', initialState);
    const ref: BsModalRef = this.modalService.show(PersonModalComponent, initialState);
    ref.content.out.subscribe((out: ModalResult<Person>) => {
        console.log('Dialog returns:', out);
        if (out.isNew) {
          this.PersonDataService.add(out.data).subscribe(
            () => ref.hide(),
            error => {
              this.dataServiceErrorMessageService.showErrorMessage(error, errorMapping);
            }
          );
        } else {
          this.PersonDataService.update(out.data).subscribe(
            () => ref.hide(),
            error => {
              this.dataServiceErrorMessageService.showErrorMessage(error, errorMapping);
            }
          );
        }
      }
    );
  }
}
