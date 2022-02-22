import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Company, EmployeeType, Person} from '@app/client-lib';
import {PersonEditComponent} from '../person-edit/person-edit.component';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {
  DataServiceErrorMessageService,
  ErrorMessageMapping
} from '../../../core/store/data-service-error-message.service';
import {PersonDataService} from '../store/person-data.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogConfig
} from '../../../core/form/modal/confirm-dialog/confirm-dialog.component';
import {take} from 'rxjs/operators';
import {DialogResult} from '../../../core/form/modal/modal.model';
import {DATE_FORMAT} from '../../../core/app.constants';

const errorMapping: ErrorMessageMapping<Company> = {
  'ForeignKeyConstraintViolationError' : {message: 'Item is used'}
}

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  @ViewChild('edit') edit!: PersonEditComponent;

  loading$!: Observable<boolean>;
  persons$!: Observable<Person[]>;
  deleting = false;

  dateFormat = DATE_FORMAT;

  constructor(
    private personDataService: PersonDataService,
    private modalService: BsModalService,
    private dataServiceErrorMessageService: DataServiceErrorMessageService
  ) {}

  ngOnInit(): void {
    this.personDataService.getAll();
    this.persons$ = this.personDataService.entities$;
    this.loading$ = this.personDataService.loading$;
  }

  onNew() {
    this.edit.onNew();
  }

  onCopy(person: Person): void  {
    const copy: Person = {...person};
    // @ts-ignore
    delete copy['id'];
    this.edit.onCopy(copy);
  }

  onEdit(person: Person): void  {
    this.edit.onEdit(person);
  }

  onDelete(person: Person): void {
    if (!person) {
      return;
    }

    const config: ConfirmDialogConfig = {
      message: `Do you want to delete '${person?.name}'?`
    };

    const dialogConfig: ModalOptions = {
      initialState: {
        config
      }
    }

    const ref: BsModalRef = this.modalService.show(ConfirmDialogComponent, dialogConfig);
    ref.content.action.pipe(take(1)).subscribe((value: DialogResult) => {
      if (value == DialogResult.OK) {
        this.deleting = true;
        this.personDataService.delete(person).subscribe(
          () => this.deleting = false,
          error => {
            this.deleting = false;
            this.dataServiceErrorMessageService.showErrorMessage(error, errorMapping);
          }
        );
      }
    });
  }
}
