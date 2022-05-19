export class ModuleError extends Error {
  declare description: string; 
  declare status: number;

  constructor(message: string, description: string, status = 500) {
    super(message);

    this.name = 'ModuleError';
    this.description = description;
    this.status = status;

    this.stack = undefined;
  }

  toJSON() {
    return {
      name: this.name,
      description: this.description,
      status: this.status
    };
  }
};
