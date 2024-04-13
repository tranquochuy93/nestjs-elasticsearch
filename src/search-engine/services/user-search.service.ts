import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { UserSearchBody } from '~search-engine/interfaces/user-search-body.interface';
import { UserSearchResult } from '~search-engine/interfaces/user-search-result.interface';
import { UserEntity } from '~users/entities/user.entity';
 
@Injectable()
export default class UserSearchService {
  private index = 'users'
 
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}
 
  async indexUser(user: UserEntity) {
    return this.elasticsearchService.index<UserSearchBody>({
      index: this.index,
      body: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    })
  }
 
  async search(text: string) {
    const body = await this.elasticsearchService.search<UserSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['firstName', 'lastName', 'email']
          }
        }
      }
    })
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }

  async update(user: UserEntity) {
    const newBody: UserSearchBody = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
 
    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');
 
    return this.elasticsearchService.updateByQuery({
      index: this.index,
      query: {
        match: {
          id: user.id,
        }
      },
      script
    })
  }

  async remove(userId: string) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      query: {
        match: {
          id: userId,
        }
      }
    })
  }
}