import { FolderParams, LinkParams } from "../typings/router";
import { IncorrectDataError, MissingDataError } from "./errors";

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isNumber = (num: unknown): num is number => {
	return typeof num === 'number' || !isNaN(Number(num));
};

const isUrl = (text: unknown): boolean => {
  let url;
  try {
    url = new URL(String(text));
  } catch (_) {
    return false;  
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

const parseTitle = (title: unknown): string => {
	if (!title) throw new MissingDataError('Missing title');
	if (!isString(title)) throw new IncorrectDataError('Incorrect title: '+(JSON.stringify(title)));
	return title;
};

const parseDate = (date: unknown): string => {
	if (!isString(date) || !isDate(date)) throw new IncorrectDataError('Incorrect date: '+(JSON.stringify(date)));
	return date;
};

const parseId = (id: unknown): number => {
	if(!isNumber(id) || !Number.isInteger(id)) throw new IncorrectDataError('Incorrect id: '+(JSON.stringify(id)));
	return id;
};

const parseURL = (url: unknown): string => {
	if (!url) throw new MissingDataError('Missing url');
	if (!isString(url) || !isUrl(url)) throw new IncorrectDataError('Incorrect url: '+(JSON.stringify(url)));
	return url;
};

export const validateFolderInput = (input: unknown): FolderParams => {
	if ( !input || typeof input !== 'object' ) {
		throw new IncorrectDataError('Incorrect or missing data');
	};

	if ('title' in  input) {
		const dateNow = new Date().toISOString();
		const output = {
			title: parseTitle(input.title),
			addDate: ('addDate' in input) ? parseDate(input.addDate) : dateNow ,
			lastModified: ('lastModified' in input) ? parseDate(input.lastModified) : dateNow ,
			parentId: ('parentId' in input && input.parentId !== null) ? parseId(input.parentId) : null ,
		};
		return output;
	}

	throw new MissingDataError('Missing title');
};

export const validateLinkInput = (input: unknown): LinkParams => {
	if ( !input || typeof input !== 'object' ) {
		throw new IncorrectDataError('Incorrect or missing data');
	};

	if ('url' in  input) {
		const output = {
			url: parseURL(input.url),
			title: ('title' in input && isString(input.title)) ? input.title : '',
			addDate: ('addDate' in input) ? parseDate(input.addDate) : new Date().toISOString() ,
			parentId: ('parentId' in input && input.parentId !== null) ? parseId(input.parentId) : null ,
		};
		return output;
	}

	throw new MissingDataError('Missing url');
};