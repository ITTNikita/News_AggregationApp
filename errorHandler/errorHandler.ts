export class ServerStatusFetchError extends Error {
  constructor(message: string = 'Failed to fetch server statuses') {
    super(message);
    this.name = 'ServerStatusFetchError';
  }
}
export class ServerDetailsFetchError extends Error {
  constructor(message: string = 'Failed to fetch server details') {
    super(message);
    this.name = 'ServerDetailsFetchError';
  }
}
export class ServerUpdateError extends Error {
  constructor() {
    const message: string = 'Failed to update server key';
    super(message);
    this.name = 'ServerUpdateError';
  }
}
export class ServerAddError extends Error {
  constructor(message: string = 'Failed to add new API server') {
    super(message);
    this.name = 'ServerAddError';
  }
}
export class CategoryAddError extends Error {
  constructor(message: string = 'Failed to add new category') {
    super(message);
    this.name = 'CategoryAddError';
  }
}
export class ArticleHideError extends Error {
  constructor(message: string = 'Failed to hide article or category') {
    super(message);
    this.name = 'ArticleHideError';
  }
}

