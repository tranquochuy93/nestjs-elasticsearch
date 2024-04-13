 
import { ProductSearchBody } from './product-search-body.interface';
export interface ProductSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: ProductSearchBody;
    }>;
  };
}