import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, timer} from 'rxjs';
import {share} from 'rxjs/operators';
import {NGXLogger, NgxLoggerLevel} from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  defaultCounter = 0;
  timers = new Map();
  default$: Subject<number>;

  constructor(private log: NGXLogger) {
    this.default$ = new BehaviorSubject(0);
    this.timers.set(0, this.default$.pipe(share()));
    this.log.trace('########## TimerService provided ########## ');
  }

  /**
   * Creates/returns a feature-shared timer as Observable<number>.
   *
   * Timers with the same interval created only once. Next time with the same interval it will return
   * the previously created (cached) timer.
   *
   *  interval=0 generates a special observable which can use manually by calling fireDefaultTimer().
   *
   * @param interval for timer
   */
  getTimer(interval: number): Observable<number> {
    let t = this.timers.get(interval);
    if (!t) {
      this.log.debug(`Getting timer(${interval})`);
      t = timer(0, interval).pipe(share());
      this.timers.set(interval, t);
    } else {
      this.log.debug(`Getting timer(${interval}) - already exists`);
    }
    return t;
  }

  fireDefaultTimer() {
    this.default$.next(++this.defaultCounter);
  }
}
