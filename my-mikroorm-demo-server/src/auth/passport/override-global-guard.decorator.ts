import { SetMetadata } from '@nestjs/common';

export const OVERRIDE_GLOBAL_GUARD_KEY = 'isOverrideGlobalGuard';
export const OverrideGlobalGuard = () => SetMetadata(OVERRIDE_GLOBAL_GUARD_KEY, true);
