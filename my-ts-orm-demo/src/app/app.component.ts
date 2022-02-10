import {Component, OnInit} from '@angular/core';
import {Person} from '@app/client-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-typeorm-demo';

  ngOnInit(): void {
  }
}
