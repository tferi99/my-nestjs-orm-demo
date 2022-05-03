/**
 * For denormalization of normalized One-to-many associated entities.
 */
export interface OneToManyAssociation<P, C> {
  parent: P;
  children: C[];
}
