import { DateTimeUtils, DurationUnit } from './datetime-util';

const SEC_MSECS = 1000;
const MIN_SECS = 60;
const HOUR_MINS = 60;
// day
const DAY_HOURS = 24;
const DAY_MSECS = DAY_HOURS * HOUR_MINS * MIN_SECS * SEC_MSECS;

// year
const YEAR_DAYS = 365;
const YEAR_MSECS = DAY_MSECS * YEAR_DAYS;
const LEAP_YEAR_FACTOR = 4;

describe('DateUtils', () => {
  it('duration should be calculated precisely', () => {
    expect(DateTimeUtils.durationAsMilliseconds(5, DurationUnit.Days)).toStrictEqual(5 * DAY_MSECS);
    expect(DateTimeUtils.durationAsMilliseconds(2, DurationUnit.Years)).toStrictEqual(2 * YEAR_MSECS);

    const years = 60;
    expect(DateTimeUtils.durationAsDays(years, DurationUnit.Years)).toStrictEqual(60 * YEAR_DAYS + (years / LEAP_YEAR_FACTOR));
  });
});
