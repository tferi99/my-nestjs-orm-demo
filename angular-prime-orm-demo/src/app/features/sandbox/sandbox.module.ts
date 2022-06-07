import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SandboxHeaderComponent } from './sandbox-header/sandbox-header.component';
import { CompanyPanelComponent } from './company-panel/company-panel.component';
import { PersonPanelComponent } from './person-panel/person-panel.component';
import { NotePanelComponent } from './note-panel/note-panel.component';
import { APP_PRIMENG_MODULES, APP_PRIMENG_PROVIDERS } from '../../layout/primeng-modules';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SandboxComponent,
    SandboxHeaderComponent,
    CompanyPanelComponent,
    PersonPanelComponent,
    NotePanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // PrimeNG
    APP_PRIMENG_MODULES,
  ],
  providers: [
    APP_PRIMENG_PROVIDERS,
  ]
})
export class SandboxModule { }
