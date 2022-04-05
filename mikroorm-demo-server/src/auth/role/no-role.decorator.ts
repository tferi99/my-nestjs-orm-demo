import { SetMetadata } from '@nestjs/common';

export const NO_ROLE_KEY = '__NoRole__';
export const NoRole = () => SetMetadata(NO_ROLE_KEY, true);
