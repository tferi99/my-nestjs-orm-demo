import {Component, OnInit} from '@angular/core';
import {Person} from '@app/client-lib';
import {InitService} from './init/init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-typeorm-demo';

  constructor(private initService: InitService) {}

  ngOnInit(): void {
    this.initService.init();
  }
}
