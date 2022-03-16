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
exports.Person = void 0;
const typeorm_1 = require("typeorm");
const my_ts_orm_demo_lib_1 = require("my-ts-orm-demo-lib");
const company_entity_1 = require("./company.entity");
let Person = class Person {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Person.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 64 }),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ length: 256 }),
    __metadata("design:type", String)
], Person.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: 'date' }),
    __metadata("design:type", Date)
], Person.prototype, "birth", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: my_ts_orm_demo_lib_1.EmployeeType,
        default: my_ts_orm_demo_lib_1.EmployeeType.WORKER
    }),
    __metadata("design:type", String)
], Person.prototype, "employeeType", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Person.prototype, "rank", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Person.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({ length: 1024, nullable: true }),
    __metadata("design:type", String)
], Person.prototype, "note", void 0);
__decorate([
    typeorm_1.ManyToOne(() => company_entity_1.Company, company => company.workers, { nullable: true }),
    __metadata("design:type", company_entity_1.Company)
], Person.prototype, "company", void 0);
Person = __decorate([
    typeorm_1.Entity()
], Person);
exports.Person = Person;
//# sourceMappingURL=person.entity.js.map