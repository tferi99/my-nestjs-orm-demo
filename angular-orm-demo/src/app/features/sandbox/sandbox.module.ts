import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SandboxComponent} from './sandbox/sandbox.component';
import {CompanyPanelComponent} from './company-panel/company-panel.component';
import {PersonPanelComponent} from './person-panel/person-panel.component';
import {NotePanelComponent} from './note-panel/note-panel.component';
import {SandboxHeaderComponent} from './sandbox-header/sandbox-header.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SandboxComponent,
    CompanyPanelComponent,
    PersonPanelComponent,
    NotePanelComponent,
    SandboxHeaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    SandboxComponent
  ]
})
export class SandboxModule { }
