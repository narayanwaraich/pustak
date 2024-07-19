import { FolderParams, LinkParams } from "../typings/router";
import { IncorrectDataError, MissingDataError } from "./customErrors";

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
  return url.protocol === "http:" || url.protocol === "https:" || url.protocol === "javascript:" || url.protocol === "chrome:";
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

const parseType = (type: unknown): string => {
	if (!type) throw new MissingDataError('Missing title');
	if (!isString(type)) throw new IncorrectDataError('Incorrect type: '+(JSON.stringify(type)));
	return type;
};

const parseFolder = (type: unknown): 'folder' => {
	parseType(type);
	if (type !== 'folder')  throw new IncorrectDataError('Type should be folder. Incorrect type: '+(JSON.stringify(type)));
	return type;
};

const parseLink = (type: unknown): 'link' => {
	parseType(type);
	if (type !== 'link')  throw new IncorrectDataError('Type should be link. Incorrect type: '+(JSON.stringify(type)));
	return type;
};

export const validateFolderInput = (input: unknown): FolderParams => {
	if ( !input || typeof input !== 'object' ) {
		throw new IncorrectDataError('Incorrect or missing data');
	};

	if ('type' in input) {
		const dateNow = new Date().toISOString();
		const output = {
			title: ('title' in input) ? parseTitle(input.title) : '',
			addDate: ('addDate' in input) ? parseDate(input.addDate) : dateNow ,
			lastModified: ('lastModified' in input) ? parseDate(input.lastModified) : dateNow ,
			type: ('type' in input) ? parseFolder(input.type) : 'folder' ,
			parentId: ('parentId' in input && input.parentId !== null) ? parseId(input.parentId) : null ,
		};
		return output;
	}

	throw new MissingDataError('This isn\'t a folder or a link!');
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
			type: ('type' in input) ? parseLink(input.type) : 'link' ,
			parentId: ('parentId' in input && input.parentId !== null) ? parseId(input.parentId) : null ,
		};
		return output;
	}

	throw new MissingDataError('Missing url');
};