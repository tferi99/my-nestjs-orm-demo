import { SetMetadata } from '@nestjs/common';
import { DEFAULT_ORM_CRUD_CONTROLLER_FEATURE_POLICY, EnabledFeatures } from './orm-crud-controller-feature.guard';

export const ORM_CRUD_CONTROLLER_FEATURES_KEY = 'features';
export const Features = (features: Partial<EnabledFeatures>) => SetMetadata(ORM_CRUD_CONTROLLER_FEATURES_KEY, { ...DEFAULT_ORM_CRUD_CONTROLLER_FEATURE_POLICY, ...features });
