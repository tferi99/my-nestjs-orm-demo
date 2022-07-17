import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { FormValidatorService } from '../service/form-validator.service';
import { FormOutputData, FormDataConfig } from '../form/modal/modal.model';

/**
 * This error detects if this form can be used only for creating NEW data.
 * Input data won't be populated into form.
 */
class OnlyNewModeAllowedError extends Error {
  constructor() {
    super('EDIT mode detected (input data specify). To enable EDIT mode override getNameOfId()');
  }
}

/**
 * Base class to help reactive form implementations.
 *
 * Steps of usage:
 * - extend implementation class from this abstract one
 * - if you need EDIT mode override getNameOfId()
 *    NOTE: if you don't override this method but you specify formDataConfig.inputData then thrown OnlyNewModeAllowedError
 * - override beforeEdit() if you want to change input data before populating form (optional)
 * - override beforeSave() if you want to change input data before emitting data on submit (optional)
 * - emitting data:
 *   - either override submitted()
 *   - or pass target stream in FormDataConfig.outputDataStream
 */
@Component({
  selector: 'app-form-component-base',
  template: ``,
  styles: []
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class FormComponentBase<T, A, PK extends keyof T> implements OnInit {
  static tracing = false;

  @Input() formDataConfig?: FormDataConfig<T, A>;

  private _formValidatorService;
  public additionalData!: A;

  form!: FormGroup;
  isNew = false;

  constructor(
    formValidatorService: FormValidatorService,
  ) {
    this._formValidatorService = formValidatorService;
  }

  ngOnInit(): void {
    this.initForm();
  }

  protected abstract getForm(): FormGroup;

  /**
   * Implement this function to support EDIT (isNew = false) mode
   * @protected
   */
  protected getNameOfId(): PK {
    throw new OnlyNewModeAllowedError();
  }

  /**
   * Override if yo want to convert data properties before populating form.
   * @protected
   */
  protected beforeEdit(data: T | undefined): void {
  }

  // override for implementation
  protected beforeSave(data: any): void {
  }

  protected submitted(data: FormOutputData<T>): void {
    throw new Error('Method not overridden. Either override FormComponentBase.submitted() or specify outputData.outputData stream.');
  }

  protected initForm(): void {
    if (!this.formDataConfig) {
      throw new Error('Form not initialized properly - \'formData\' is undefined');
    }
    this.trace('initial config', this.formDataConfig);

    let inputData = undefined;
    // copy input data, maybe source is read-only (e.g. NgEx store)
    if (this.formDataConfig.inputData) {
      inputData = {...this.formDataConfig.inputData};
    }
    if (this.formDataConfig.additionalInputData) {
      this.additionalData = {...this.formDataConfig.additionalInputData};
    }
    this.trace('cloned input data', inputData);

    // new/edit?
    // if input data specified then EDIT moode shoult be supported
    if (!inputData) {
      this.isNew = true;
    }
    this.trace('new?', this.isNew);

    // populating form
    if (!this.isNew) {
      const id = this.getNameOfId();
      this.isNew = inputData![id] === undefined;
      if (!this.isNew) {
        this.beforeEdit(inputData);
        this.form.patchValue(inputData!);
        this.trace('ModalComponentBase Form patched before editing:', this.form.value);
      }
    }
  }

  onSubmit(): void {
    const data: T = this.form.getRawValue();
    this.beforeSave(data);
    this.trace('onSubmit() FORM DATA: ', data);

    const result: FormOutputData<T> = {
      data,
      isNew: this.isNew
    };
    this.trace('DIALOG OUTPUT: ', result);

    if (this.formDataConfig?.outputDataStream) {
      this.formDataConfig?.outputDataStream.next(result);
    } else {
      this.submitted(result);
    }
  }

  getFormControlErrorMessage(ctr: AbstractControl): string {
    return this._formValidatorService.getFormControlErrorMessage(ctr);
  }

  onDump() {
    console.log('FORM NEW?:', this.isNew);
    console.log('FORM DATA:', this.form.value);
    if (!this.form.valid) {
      console.log('FORM ERRORS:', this.form.errors);
    }
  }

  protected trace(msg: string, ...data: any[]) {
    if (FormComponentBase.tracing) {
      console.log('[FORM]: ' + msg, data);
    }
  }
}
