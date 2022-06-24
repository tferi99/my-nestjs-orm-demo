// DI token
import { ForbiddenException, Injectable } from '@nestjs/common';
import { EnabledFeatures } from '../controller/orm-crud-controller.base';

export const ORM_CRUD_CONTROLLER_FEATURE_VALIDATOR = 'ORM_CRUD_CONTROLLER_FEATURE_VALIDATOR';

@Injectable()
export class OrmCrudControllerFeatureValidatorService {
  validate(enabledFeatures: EnabledFeatures, featureId: keyof EnabledFeatures): void {
    if (!enabledFeatures[featureId]) {
      throw new ForbiddenException('This feature not enabled');
    }
  }
}
