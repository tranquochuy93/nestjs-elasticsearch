 
interface ProductSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: ProductSearchResult;
    }>;
  };
}