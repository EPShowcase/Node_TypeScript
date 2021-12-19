import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Bio} from '../models';
import {BioRepository} from '../repositories';

@authenticate('jwt')
export class BioController {
  constructor(
    @repository(BioRepository)
    public bioRepository: BioRepository,
  ) {}

  @post('/bios')
  @response(200, {
    description: 'Bio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bio, {
            title: 'NewBio',
            exclude: ['id'],
          }),
        },
      },
    })
    bio: Omit<Bio, 'id'>,
  ): Promise<Bio> {
    return this.bioRepository.create(bio);
  }

  @authenticate.skip()
  @get('/bios/count')
  @response(200, {
    description: 'Bio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Bio) where?: Where<Bio>): Promise<Count> {
    return this.bioRepository.count(where);
  }

  @authenticate.skip()
  @get('/bios')
  @response(200, {
    description: 'Array of Bio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bio, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Bio) filter?: Filter<Bio>): Promise<Bio[]> {
    return this.bioRepository.find(filter);
  }

  @patch('/bios')
  @response(200, {
    description: 'Bio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bio, {partial: true}),
        },
      },
    })
    bio: Bio,
    @param.where(Bio) where?: Where<Bio>,
  ): Promise<Count> {
    return this.bioRepository.updateAll(bio, where);
  }

  @authenticate.skip()
  @get('/bios/{id}')
  @response(200, {
    description: 'Bio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Bio, {exclude: 'where'}) filter?: FilterExcludingWhere<Bio>,
  ): Promise<Bio> {
    return this.bioRepository.findById(id, filter);
  }

  @patch('/bios/{id}')
  @response(204, {
    description: 'Bio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bio, {partial: true}),
        },
      },
    })
    bio: Bio,
  ): Promise<void> {
    await this.bioRepository.updateById(id, bio);
  }

  @put('/bios/{id}')
  @response(204, {
    description: 'Bio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() bio: Bio,
  ): Promise<void> {
    await this.bioRepository.replaceById(id, bio);
  }

  @del('/bios/{id}')
  @response(204, {
    description: 'Bio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.bioRepository.deleteById(id);
  }
}
