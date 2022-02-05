import { EntityRepository, Repository } from "@mikro-orm/core";
import { Person } from "./model/person.entity";

@Repository(Person)
export class PersonRepository extends EntityRepository<Person> {}
