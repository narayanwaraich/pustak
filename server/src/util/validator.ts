import { FolderType, BookmarkType } from "../typings/router";
import { IncorrectDataError, MissingDataError } from "./customErrors";

type LooseObject = Record<string, string | number | null>;

const isObj = (obj: unknown): obj is LooseObject => {
  return obj !== null && typeof obj === "object";
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || !isNaN(Number(num));
};

const isUrl = (text: unknown): boolean => {
  let url;
  try {
    url = new URL(String(text));
  } catch (_) {
    return false;
  }
  return (
    url.protocol === "http:" ||
    url.protocol === "https:" ||
    url.protocol === "javascript:" ||
    url.protocol === "chrome:"
  );
};

const parseTitle = (input: unknown): string | null => {
  if (!input) return null;
  if (!isString(input))
    throw new IncorrectDataError("Incorrect title: " + JSON.stringify(input));
  return input;
};

const parseDate = (input: unknown): string | null => {
  let date = input;
  if (!input) return null;
  if (isString(input) && !isDate(input))
    date = new Date(Number(date) * 1000).toISOString();
  if (!isString(date) || !isDate(date))
    throw new IncorrectDataError("Incorrect date: " + JSON.stringify(date));
  return date;
};

const parseId = (input: unknown): number | null => {
  if (!input) return null;
  if (!isNumber(input) || !Number.isInteger(input))
    throw new IncorrectDataError("Incorrect id: " + JSON.stringify(input));
  return input;
};

const parseURL = (input: unknown): string | null => {
  if (!input) return null;
  if (!isString(input) || !isUrl(input))
    throw new IncorrectDataError("Incorrect input: " + JSON.stringify(input));
  return input;
};

const parseType = (
  input: unknown,
  val: "bookmark" | "folder"
): "bookmark" | "folder" => {
  if (!input) throw new MissingDataError("Missing type definition");
  if (!isString(input) || input.length === 0)
    throw new IncorrectDataError(
      "Incorrect type definition: " + JSON.stringify(input)
    );
  if (input !== val)
    throw new IncorrectDataError(
      "Incorrect type definition: type should be " +
        val +
        ", instead it is " +
        input
    );
  return input;
};

const parseBookmarkType = (input: unknown) => {
  const type = parseType(input, "bookmark");
  if (type !== "bookmark")
    throw new IncorrectDataError(
      "Incorrect type definition: " + JSON.stringify(type)
    );
  return type;
};

const parseFolderType = (input: unknown) => {
  const type = parseType(input, "folder");
  if (type !== "folder")
    throw new IncorrectDataError(
      "Incorrect type definition: " + JSON.stringify(type)
    );
  return type;
};

const parsePosition = (input: unknown): number => {
  if (!input) return 0;
  if (!isNumber(input))
    throw new IncorrectDataError(
      "Incorrect position: " + JSON.stringify(input)
    );
  return input > 0 ? input : 0;
};

const parseIcon = (input: unknown): string | null => {
  if (!input) return null;
  if (!isString(input))
    throw new IncorrectDataError("Incorrect icon: " + JSON.stringify(input));
  return input;
};

export const validateFolder = (folder: unknown): FolderType => {
  if (!isObj(folder))
    throw new IncorrectDataError("Incorrect or missing data:");

  return {
    title: parseTitle(folder.title),
    addDate: parseDate(folder.addDate),
    lastModified: parseDate(folder.lastModified),
    type: parseFolderType(folder.type),
    position: parsePosition(folder.position),
    parentId: parseId(folder.parentId),
    userId: parseId(folder.userId),
  };
};

export const validateBookmark = (bookmark: unknown): BookmarkType => {
  if (!isObj(bookmark))
    throw new IncorrectDataError("Incorrect or missing data:");

  return {
    url: parseURL(bookmark.url),
    title: parseTitle(bookmark.title),
    addDate: parseDate(bookmark.addDate),
    type: parseBookmarkType(bookmark.type),
    position: parsePosition(bookmark.position),
    parentId: parseId(bookmark.parentId),
    icon: parseIcon(bookmark.icon),
    userId: parseId(bookmark.userId),
  };
};

export default {
  parseTitle,
  parseDate,
  parseURL,
  parseIcon,
};
