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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const person_entity_1 = require("./person.entity");
const typeorm_2 = require("typeorm");
const company_entity_1 = require("./company.entity");
let CompanyService = class CompanyService {
    constructor(repo, personRepo) {
        this.repo = repo;
        this.personRepo = personRepo;
    }
    async get(id) {
        return this.repo.findOne(id);
    }
    async getAll() {
        return this.repo.find({
            order: { name: 'ASC' }
        });
    }
    async save(dto) {
        return this.repo.save(dto);
    }
    async delete(id) {
        return this.repo.delete(id);
    }
    async saveWithPerson(dto) {
        const newItem = await this.repo.save(dto);
        if (dto.workers && dto.workers) {
            for (let p of dto.workers) {
                await this.personRepo.save(p);
            }
        }
        return this.repo.save(dto);
    }
};
CompanyService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(company_entity_1.Company)),
    __param(1, typeorm_1.InjectRepository(person_entity_1.Person)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=company.service.js.map