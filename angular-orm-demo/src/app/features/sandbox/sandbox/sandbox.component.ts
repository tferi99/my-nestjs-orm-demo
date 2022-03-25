import { Component, OnInit } from '@angular/core';
import {CHANGE_DETECTION_STRATEGY} from '../../../app.constants';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss'],
  changeDetection: CHANGE_DETECTION_STRATEGY
})
export class SandboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
