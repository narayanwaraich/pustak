import { CustomError } from "../typings/util";

class RequiredInputError extends Error implements CustomError {
	status: number;
  constructor(message:string) {
    super(message);
    this.name = 'RequiredInputError';
		this.status = 400;
  }
}

export default RequiredInputError;