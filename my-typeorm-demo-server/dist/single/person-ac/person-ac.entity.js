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
exports.PersonAc = void 0;
const typeorm_1 = require("typeorm");
const my_ts_orm_demo_lib_1 = require("my-ts-orm-demo-lib");
let PersonAc = class PersonAc extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PersonAc.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PersonAc.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PersonAc.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: 'date' }),
    __metadata("design:type", Date)
], PersonAc.prototype, "birth", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: my_ts_orm_demo_lib_1.EmployeeType,
        default: my_ts_orm_demo_lib_1.EmployeeType.WORKER
    }),
    __metadata("design:type", String)
], PersonAc.prototype, "employeeType", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], PersonAc.prototype, "rank", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], PersonAc.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({ length: 1024, nullable: true }),
    __metadata("design:type", String)
], PersonAc.prototype, "note", void 0);
PersonAc = __decorate([
    typeorm_1.Entity()
], PersonAc);
exports.PersonAc = PersonAc;
//# sourceMappingURL=person-ac.entity.js.map