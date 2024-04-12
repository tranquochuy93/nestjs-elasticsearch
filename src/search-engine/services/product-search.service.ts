import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ProductEntity } from '~products/entities/product.entity';
 
@Injectable()
export default class ProductSearchService {
  index = 'products'
 
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}
 
  async indexPost(product: ProductEntity) {
    return this.elasticsearchService.index<ProductSearchBody>({
      index: this.index,
      body: {
        id: product.id,
        name: product.name,
      }
    })
  }
 
  async search(text: string) {
    console.log('=================', text)
    const body = await this.elasticsearchService.search<ProductSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['name']
          }
        }
      }
    })
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}