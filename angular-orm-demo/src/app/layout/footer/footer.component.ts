import { Component, OnInit } from '@angular/core';
import {CHANGE_DETECTION_STRATEGY} from '../../app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class FooterComponent implements OnInit {
  started = new Date();
  refreshTime = 1000;

  constructor() { }

  ngOnInit(): void {
  }

  getElapsedSecs() {
    const now = Date.now();
    const diff = Math.floor((now - this.started.getTime()) / 1000);
    //console.log('getElapsedSecs() => ' + diff);
    return diff
  }
}
