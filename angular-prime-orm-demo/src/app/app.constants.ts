import {ChangeDetectionStrategy} from '@angular/core';

export const DEFAULT_ADMIN = 'admin';

// ------------------- Change detection -------------------
// strategy
// export const CHANGE_DETECTION_STRATEGY = ChangeDetectionStrategy.Default;
export const CHANGE_DETECTION_STRATEGY = ChangeDetectionStrategy.OnPush;
