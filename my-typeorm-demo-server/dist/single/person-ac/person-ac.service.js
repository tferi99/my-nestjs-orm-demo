"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonAcService = void 0;
const common_1 = require("@nestjs/common");
const person_ac_entity_1 = require("./person-ac.entity");
let PersonAcService = class PersonAcService {
    async save(person) {
        const newPerson = person_ac_entity_1.PersonAc.create(person);
        return newPerson.save();
    }
    async delete(id) {
        person_ac_entity_1.PersonAc.delete(id);
    }
};
PersonAcService = __decorate([
    common_1.Injectable()
], PersonAcService);
exports.PersonAcService = PersonAcService;
//# sourceMappingURL=person-ac.service.js.map