import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Bio, BioRelations} from '../models';

export class BioRepository extends DefaultCrudRepository<
  Bio,
  typeof Bio.prototype.id,
  BioRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Bio, dataSource);
  }
}
