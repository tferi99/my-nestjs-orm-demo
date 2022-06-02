import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ModalTestFormComponent } from './modal-test-form/modal-test-form.component';
import { ModalTestData, ModalTestInput } from './modal-test.model';
import { DialogOutput } from '../../../core/form/modal/modal.model';
import { ToastrService } from '../../../prime-core/service/toastr.service';

@Component({
  selector: 'app-modal-test',
  templateUrl: './modal-test.component.html',
  styleUrls: ['./modal-test.component.scss']
})
export class ModalTestComponent implements OnInit {
  data!: ModalTestData;

  constructor(
    public dialogService: DialogService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('MODAL INIT');
    this.data = {
      name: 'Fogarassy Árpád',
      weight: 82,
      birth: new Date()
    };
  }

  onTest() {
    const input: ModalTestInput = {
      data: this.data,
      isNew: false
    }
    const ref = this.dialogService.open(ModalTestFormComponent, {
      data: input,
      header: 'Choose a Car',
      width: '70%',
      height: '500px'
    });
    ref.onClose.subscribe((out: ModalTestData) => {
      console.log('RESULT FROM MODAL:', out);
      if (out) {
        this.data = out;
      }
      });
  }

  msg1() {
    this.toastrService.info('fasz');
  }

  msg2() {
    this.toastrService.info('fasz', 'picsa');
  }

  msg3() {
    this.toastrService.error('valag');
  }
}


