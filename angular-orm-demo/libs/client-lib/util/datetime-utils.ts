import * as moment from 'moment';

const YEAR_MSECS = 1000 * 3600 * 24 * 365;

export enum DurationUnit {
  Years = 'years',
  Months = 'months',
  Weeks = 'weeks',
  Days = 'days',
  Hours = 'hours',
  Minutes = 'minutes',
  Seconds = 'seconds',
}

export { YEAR_MSECS };
export class DateTimeUtils {
  static durationAsMilliseconds(amount: number, unit: DurationUnit): number {
    return moment.duration(amount, unit).asMilliseconds();
  }

  static durationAsDays(amount: number, unit: DurationUnit): number {
    return moment.duration(amount, unit).asDays();
  }

  static formatDate(date: Date): string {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
  }

  static formatTimestamp(ts: number): string {
    return moment.unix(ts / 1000).format('YYYY-MM-DD HH:mm:ss');
  }
}
