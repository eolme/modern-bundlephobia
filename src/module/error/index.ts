export const enum ModuleErrorType {
  EMPTY = 'ERR_EMPTY_RESPONSE',
  NAME = 'ERR_NAME_INVALID',
  VERSION = 'ERR_VERSION_INVALID',
  CONNECTION = 'ERR_CONNECTION_REFUSED',
  REQUEST = 'ERR_REQUEST_INVALID'
}

// eslint-disable-next-line no-new-object
export const getErrorStatus = (ex: unknown) => new Object(ex).status || 500;

// eslint-disable-next-line functional/no-class
export class ModuleError extends Error {
  declare description: string;

  declare status: number;

  constructor(type: ModuleErrorType, description = '', status = 500) {
    super(type);

    this.name = 'ModuleError';
    this.description = description;
    this.status = status;

    // eslint-disable-next-line no-undefined
    this.stack = undefined;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      status: this.status
    };
  }
}
