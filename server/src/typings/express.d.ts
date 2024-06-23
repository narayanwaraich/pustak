import { Folder } from "../models";

declare global {
	namespace Express {
		export interface Request {
			folder?: Folder | null;
		}
	}
}

export {};