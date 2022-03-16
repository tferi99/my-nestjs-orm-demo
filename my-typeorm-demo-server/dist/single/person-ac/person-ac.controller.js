"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonAcController = void 0;
const common_1 = require("@nestjs/common");
const person_ac_service_1 = require("./person-ac.service");
const person_ac_entity_1 = require("./person-ac.entity");
let PersonAcController = class PersonAcController {
    constructor(service) {
        this.service = service;
    }
    async save(p) {
        return this.service.save(p);
    }
    async delete(id) {
        this.service.delete(id);
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [person_ac_entity_1.PersonAc]),
    __metadata("design:returntype", Promise)
], PersonAcController.prototype, "save", null);
__decorate([
    common_1.Delete('/:id'),
    __param(0, common_1.Param('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PersonAcController.prototype, "delete", null);
PersonAcController = __decorate([
    common_1.Controller('person-ac'),
    __metadata("design:paramtypes", [person_ac_service_1.PersonAcService])
], PersonAcController);
exports.PersonAcController = PersonAcController;
//# sourceMappingURL=person-ac.controller.js.map