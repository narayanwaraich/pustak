import { Folder, Link } from "../models/associations";

declare global {
	namespace Express {
		export interface Request {
			folder?: Folder | null;
			link?: Link | null;
		}
	}
}

export {};