import {ChangeDetectionStrategy} from '@angular/core';

export const SERVER_API_CONTEXT_PATH = '/api';

export const DATE_TIME_FORMAT = 'yyyy.MM.dd HH:mm:ss';

export const DEFAULT_ADMIN = 'admin';

// ------------------- Change detection -------------------
// strategy
// export const CHANGE_DETECTION_STRATEGY = ChangeDetectionStrategy.Default;
export const CHANGE_DETECTION_STRATEGY = ChangeDetectionStrategy.OnPush;
