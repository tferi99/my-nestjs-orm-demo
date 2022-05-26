import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalTestData, ModalTestInput } from '../modal-test.model';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NG_DATE_FORMAT } from '../../../../core/core.constants';
import { FormValidatorService } from '../../../../core/service/form-validator.service';

@Component({
  selector: 'app-modal-test-form',
  templateUrl: './modal-test-form.component.html',
  styleUrls: ['./modal-test-form.component.scss']
})
export class ModalTestFormComponent implements OnInit {
  dateFormat = NG_DATE_FORMAT;

  constructor(
    public modalConfig: DynamicDialogConfig,
    public modalRef: DynamicDialogRef,
    private fb: FormBuilder,
    private formValidatorService: FormValidatorService,
  ) { }

  form = this.fb.group({
    name: ['', [Validators.required]],
    birth: ['', Validators.required],
    weight: [0, Validators.required],
  });

  // form controls (used in template here)
  name = this.form.controls['name'] as FormControl;
  birth = this.form.controls['birth'] as FormControl;
  weight = this.form.controls['weight'] as FormControl;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    const input: ModalTestInput = this.modalConfig.data;
    //const data = this.modalConfig.data;
    const data = input.data;
    console.log('MODAL FORM INPUT:', data);
    this.form.patchValue(data);
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this.formValidatorService.getFormControlErrorMessage(ctr);
  }

  onSubmit() {
/*    const data: ModalTestData = {
      name: 'cica',
      weight: 5,
      birth: new Date()
    };*/
    const data: ModalTestData = this.form.getRawValue();
    this.modalRef.close(data);
  }

  onCancel() {
    this.modalRef.close();
  }
}
