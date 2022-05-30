import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from '../app-main/app.main.component';

@Component({
  selector: 'app-menu',
  template: `
    <div class="layout-menu-container">
      <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
        <!--
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                -->
        <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index" role="none">
          <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{ item.label }}</div>
          <ul role="menu">
            <li app-menuitem *ngFor="let child of item.items" [item]="child" [index]="i" role="none"></li>
          </ul>
        </li>
      </ul>
    </div>
  `,
})
export class AppMenuComponent implements OnInit {
  model!: any[];

  constructor(public appMain: AppMainComponent) {}

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Companies', icon: 'pi pi-fw pi-briefcase', routerLink: ['/company'] },
          { label: 'Persons', icon: 'pi pi-fw pi-users', routerLink: ['/person'] },
          { label: 'Board', icon: 'pi pi-fw pi-th-large', routerLink: ['/companyBoard'] },
        ],
      },
      {
        label: 'Pages',
        items: [
          { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['pages/login'] },
          { label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['pages/error'] },
          { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['pages/notfound'] },
          { label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['pages/access'] },
        ],
      },
      {
        label: 'Components',
        items: [
          { label: 'Input', icon: 'pi pi-fw pi-sign-in', routerLink: ['/input'] },
        ],
      },
      {
        label: 'Sandbox',
        items: [
          { label: 'Input', icon: 'pi pi-fw pi-sign-in', routerLink: ['sandbox/input'] },
          { label: 'Modal test', icon: 'pi pi-fw pi-sign-in', routerLink: ['sandbox/modaltest'] },
          { label: 'Panel test', icon: 'pi pi-fw pi-sign-in', routerLink: ['sandbox/paneltest'] },
        ],
      },
    ];
  }

  onKeydown(event: KeyboardEvent) {
    const nodeElement = <HTMLDivElement>event.target;
    if (event.code === 'Enter' || event.code === 'Space') {
      nodeElement.click();
      event.preventDefault();
    }
  }
}
