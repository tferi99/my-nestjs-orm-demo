import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {DialogResult} from '../modal.model';

export interface ConfirmDialogConfig {
  message: string;
};

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit{
  @Output() action = new EventEmitter<string>();
  config!: ConfirmDialogConfig;

  constructor(
    public bsModalRef: BsModalRef,
  ) {}

  ngOnInit(): void {
  }

  confirm() {
    this.action.emit(DialogResult.OK);
    this.bsModalRef.hide();
  }

  decline() {
    this.action.emit(DialogResult.CANCEL);
    this.bsModalRef.hide();
  }
}
