import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../appconfig';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login2.component.html',
  styles: [
    `
      :host ::ng-deep .p-password input {
        width: 100%;
        padding: 1rem;
      }

      :host ::ng-deep .pi-eye {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }

      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class Login2Component implements OnInit, OnDestroy {
  valCheck: string[] = ['remember'];

  password?: string;
  config!: AppConfig;
  subscription!: Subscription;

  constructor(public configService: ConfigService) {}

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe((config) => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
