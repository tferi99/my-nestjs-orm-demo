import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../appconfig';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  config!: AppConfig;

  constructor(public configService: ConfigService) {}

  ngOnInit() {
    this.config = this.configService.config;
  }
}
