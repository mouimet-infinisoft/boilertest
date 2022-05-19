declare namespace API {
  type Meta = Record<string, any>;

  type Error = {
    /** Error code */
    errorCode?: string;
    /** Error message */
    errorMessage?: string;
    /** false */
    success?: boolean;
  };

  type List = {
    data?: Item[];
    /** Item count */
    total?: number;
    success?: boolean;
  };

  type Item = Entity & Contact;

  type ItemSuccess = {
    data?: Item;
    success?: boolean;
  };

  type Success = {
    data?: Item[];
    success?: boolean;
  };

  type Entity = {
    /** Partition Key */
    ID?: string;
    /** Sort Key */
    SK?: string;
    /** SubCategory - Global Secondary Index */
    Subcategory?: string;
    /** Optional ID. Can be used by front-end to identify new items. */
    tempID?: string;
    /** Item is enabled or disabled */
    enabled?: boolean;
    /** Item creator userid */
    USERID?: string;
    /** Item creator name */
    NAME?: string;
    /** Item creator email */
    EMAIL?: string;
    /** Item creator picture url */
    PICTURE?: string;
    /** Meta Data Item Count */
    Count?: string;
    /** Creation date in ISO 8601 format */
    createdAt?: string;
    /** Last updated date in ISO 8601 format */
    updatedAt?: string;
    /** Relation in the graph */
    relatedWith?: string[];
  };

  type Contact = {
    name?: string;
    avatar?: string;
    email?: string;
    address?: string;
    website?: string;
    telephones?: string[];
  };

  type metacategoryParams = {
    /** Current page */
    current?: number;
    /** Items per page */
    pageSize?: number;
    /** Sort by */
    SK?: string;
    /** Filter by subcategory */
    subcategory?: string;
  };

  type metasubcategoryParams = {
    /** Current page */
    current?: number;
    /** Items per page */
    pageSize?: number;
    /** Sort by */
    SK?: string;
    /** Filter by subcategory */
    subcategory?: string;
  };

  type listParams = {
    /** Current page */
    current?: number;
    /** Items per page */
    pageSize?: number;
    /** Search term */
    search?: string;
    /** Sort by */
    sort?: 'date' | 'category' | 'rating';
    /** Sort by category */
    category?: string;
    /** Filter by subcategory */
    subcategory?: string;
  };

  type readParams = {
    SK: string;
  };
}
