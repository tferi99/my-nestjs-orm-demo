import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {TimerService} from '../../../core/service/timer.service';

@Component({
  selector: 'app-value-refreshed-by-timer',
  template: `{{value}}<span style="display: none">[{{timer$ | async}}]</span>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueRefreshedByTimerComponent implements OnInit {
  @Input() interval!: number;
  @Input() value!: string;

  timer$!: Observable<number>;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    if (this.interval > 0) {
      // the same interval uses the same timer instance
      this.timer$ = this.timerService.getTimer(this.interval);
    }
  }
}
