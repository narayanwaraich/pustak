
class IncorrectDataError extends Error {
	status: number;
  constructor(message:string) {
    super(message);
    this.name = 'IncorrectDataError';
		this.status = 418;
  }
}

class MissingDataError extends Error {
	status: number;
  constructor(message:string) {
    super(message);
    this.name = 'MissingDataError';
		this.status = 419;
  }
}

export {IncorrectDataError, MissingDataError};