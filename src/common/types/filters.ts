import {Page} from './track';

type NakedTag = {
  id: string;
  displayName: string;
};
export type TagWithUrl = NakedTag & {
  url: string;
  mapper: (data: unknown) => Page;
};
export type NormalTag = NakedTag & {
  category: 'genre' | 'year';
};
export type Tag = NormalTag | TagWithUrl;
export type Filters = {
  sort?: 'name' | 'popularity' | 'release-date';
  tags?: Tag[];
  searchTerm?: string | null;
};
