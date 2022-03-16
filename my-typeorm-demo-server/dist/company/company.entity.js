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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const person_entity_1 = require("./person.entity");
let Company = class Company {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Company.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: 'date' }),
    __metadata("design:type", Date)
], Company.prototype, "established", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Company.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({ length: 1024, nullable: true }),
    __metadata("design:type", String)
], Company.prototype, "note", void 0);
__decorate([
    typeorm_1.OneToMany(() => person_entity_1.Person, person => person.company, { nullable: true }),
    __metadata("design:type", Array)
], Company.prototype, "workers", void 0);
Company = __decorate([
    typeorm_1.Entity()
], Company);
exports.Company = Company;
//# sourceMappingURL=company.entity.js.map