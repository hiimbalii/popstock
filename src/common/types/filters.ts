export type Tag = {
  id: string;
  displayName: string;
};
export type Filters = {
  sort?: 'name' | 'popularity' | 'release-date';
  tags?: Tag[];
  searchTerm?: string | null;
};
