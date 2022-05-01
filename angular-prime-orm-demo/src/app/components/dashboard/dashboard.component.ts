import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    items!: MenuItem[];
    subscription!: Subscription;
    config!: AppConfig;

    constructor(public configService: ConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });
    }
}
