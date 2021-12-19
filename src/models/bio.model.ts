import {Entity, model, property} from '@loopback/repository';

@model()
export class Bio extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  linkedInUrl: string;

  @property({
    type: 'string',
    required: true,
  })
  curriculumVitae: string;

  constructor(data?: Partial<Bio>) {
    super(data);
  }
}

export interface BioRelations {
  // describe navigational properties here
}

export type BioWithRelations = Bio & BioRelations;
