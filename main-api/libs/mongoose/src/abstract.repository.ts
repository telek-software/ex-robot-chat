/**
 * AbstractRepository
 * @interface
 */
export interface AbstractRepository<T extends object> {
  create: (element: T) => Promise<T>;

  findOne: (filter: unknown) => Promise<unknown>;

  findOneAndUpdate: (filter: unknown, update: Partial<T>) => Promise<T>;

  find: (filter?: unknown) => Promise<unknown>;
}
