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
import {Experience} from '../models';
import {ExperienceRepository} from '../repositories';

@authenticate('jwt')
export class ExperienceController {
  constructor(
    @repository(ExperienceRepository)
    public experienceRepository: ExperienceRepository,
  ) {}

  @post('/experiences')
  @response(200, {
    description: 'Experience model instance',
    content: {'application/json': {schema: getModelSchemaRef(Experience)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Experience, {
            title: 'NewExperience',
            exclude: ['id'],
          }),
        },
      },
    })
    experience: Omit<Experience, 'id'>,
  ): Promise<Experience> {
    return this.experienceRepository.create(experience);
  }

  @authenticate.skip()
  @get('/experiences/count')
  @response(200, {
    description: 'Experience model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Experience) where?: Where<Experience>,
  ): Promise<Count> {
    return this.experienceRepository.count(where);
  }

  @authenticate.skip()
  @get('/experiences')
  @response(200, {
    description: 'Array of Experience model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Experience, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Experience) filter?: Filter<Experience>,
  ): Promise<Experience[]> {
    return this.experienceRepository.find(filter);
  }

  @patch('/experiences')
  @response(200, {
    description: 'Experience PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Experience, {partial: true}),
        },
      },
    })
    experience: Experience,
    @param.where(Experience) where?: Where<Experience>,
  ): Promise<Count> {
    return this.experienceRepository.updateAll(experience, where);
  }

  @authenticate.skip()
  @get('/experiences/{id}')
  @response(200, {
    description: 'Experience model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Experience, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Experience, {exclude: 'where'})
    filter?: FilterExcludingWhere<Experience>,
  ): Promise<Experience> {
    return this.experienceRepository.findById(id, filter);
  }

  @patch('/experiences/{id}')
  @response(204, {
    description: 'Experience PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Experience, {partial: true}),
        },
      },
    })
    experience: Experience,
  ): Promise<void> {
    await this.experienceRepository.updateById(id, experience);
  }

  @put('/experiences/{id}')
  @response(204, {
    description: 'Experience PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() experience: Experience,
  ): Promise<void> {
    await this.experienceRepository.replaceById(id, experience);
  }

  @del('/experiences/{id}')
  @response(204, {
    description: 'Experience DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.experienceRepository.deleteById(id);
  }
}
