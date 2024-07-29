/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JSDOM } from "jsdom";
// import * as cheerio from "cheerio";
import { FolderType, BookmarkType } from "../typings/router";
// import { validateFolder, validateBookmark } from "./validator";
import validate from "./validator";
import * as fs from "fs";

export interface BulkFolder extends Omit<FolderType, "parentId"> {
  temp_parent_id: number | null;
  temp_id: number;
}

export interface BulkBookmark extends Omit<BookmarkType, "parentId"> {
  temp_parent_id: number | null;
}

/*
export const parseBookmarks = (
  htmlContent: string
): {
  bookmarks: BulkBookmark[];
  folders: BulkFolder[];
} => {
  const dom = new JSDOM(htmlContent);
  const doc = dom.window.document;

  const bookmarks: BulkBookmark[] = [];
  const folders: BulkFolder[] = [];
  let tempParentId = 0;

  function processNode(
    node: Element,
    parentId: number | null = null,
    position = 1
  ): number {
    if (node.tagName === "A") {
      // It's a bookmark
      bookmarks.push({
        title: validate.parseTitle(node.textContent),
        url: validate.parseURL(node.getAttribute("href")),
        addDate: validate.parseDate(node.getAttribute("add_date")),
        icon: validate.parseIcon(node.getAttribute("icon")),
        temp_parent_id: parentId,
        position: position,
        type: "bookmark",
      });
      return position + 1;
    } else if (node.tagName === "H3") {
      // It's a folder
      tempParentId++;
      folders.push({
        temp_id: tempParentId,
        title: validate.parseTitle(node.textContent),
        addDate: validate.parseDate(node.getAttribute("add_date")),
        lastModified: validate.parseDate(node.getAttribute("last_modified")),
        temp_parent_id: parentId,
        position: position,
        type: "folder",
      });
      // Process child nodes
      const dl = node.nextElementSibling;
      if (dl && dl.tagName === "DL") {
        let childPosition = 1;
        for (const childNode of Array.from(dl.children)) {
          if (childNode.tagName === "DT") {
            const firstChild = childNode.firstElementChild;
            if (firstChild) {
              childPosition = processNode(
                firstChild,
                tempParentId,
                childPosition
              );
            }
          }
        }
      }
      return position + 1;
    }
    return position;
  }

  // Start processing from the body
  let rootPosition = 1;
  const dtElements = doc.body.querySelectorAll("dt");
  for (const dt of Array.from(dtElements)) {
    const firstChild = dt.firstElementChild;
    if (firstChild) {
      rootPosition = processNode(firstChild, null, rootPosition);
    }
  }

  return { bookmarks, folders };
};
*/

const testParsing = (htmlContent: string) => {
  const pRegex = /<p>/gi;
  const headingRegex = /<\/H3>/gi;
  const anchorRegex = /<\/A>/gi;

  const cleanHTML = (string: string) => {
    string = string.replaceAll(pRegex, "");
    string = string.replaceAll(headingRegex, "</H3></DT>");
    string = string.replaceAll(anchorRegex, "</A></DT>");
    return string;
  };

  const cleanContent = cleanHTML(htmlContent);

  const dom = new JSDOM(cleanContent);
  const doc = dom.window.document;

  const bookmarks: BulkBookmark[] = [];
  const folders: BulkFolder[] = [];
  let id = 0;

  const addFolder = (
    node: Element,
    position: number,
    parentId: number | null
  ) => {
    id++;
    folders.push({
      temp_id: id,
      title: validate.parseTitle(node.textContent),
      addDate: validate.parseDate(node.getAttribute("add_date")),
      lastModified: validate.parseDate(node.getAttribute("last_modified")),
      temp_parent_id: parentId,
      position: position,
      type: "folder",
    });
  };

  const addBookmark = (
    node: Element,
    position: number,
    parentId: number | null
  ) => {
    bookmarks.push({
      title: validate.parseTitle(node.textContent),
      url: validate.parseURL(node.getAttribute("href")),
      addDate: validate.parseDate(node.getAttribute("add_date")),
      icon: validate.parseIcon(node.getAttribute("icon")),
      temp_parent_id: parentId,
      position: position,
      type: "bookmark",
    });
  };

  const addNode = (
    node: Element,
    position: number,
    parentId: number | null
  ) => {
    if (node.nodeName === "H3") {
      addFolder(node, position, parentId);
    } else if (node.nodeName === "A") {
      addBookmark(node, position, parentId);
    }
  };

  const findNextNode = (node: Element) => {
    const parentNode = node.parentElement;
    if (parentNode === doc.body) return null;
    if (parentNode) {
      const nextNode = parentNode.nextElementSibling;
      if (nextNode) return nextNode;
      else return findNextNode(parentNode);
    } else return null;
  };

  const handleNextNode = (
    node: Element,
    position = 1,
    parentId: number | null = null
  ) => {
    let nextNode = node.nextElementSibling;
    if (!nextNode) nextNode = findNextNode(node);
    if (nextNode) {
      if (nextNode.nodeName === "DT") processNode(nextNode, position, parentId);
      if (nextNode.nodeName === "DL") processFolder(nextNode, position, id);
    }
  };

  const processNode = (
    dt: Element,
    position: number,
    parentId: number | null
  ) => {
    const dtChildNode = dt.firstElementChild;
    if (dtChildNode) {
      addNode(dtChildNode, position, parentId);
      position++;
    }
    handleNextNode(dt, position, parentId);
  };

  const processFolder = (
    dl: Element,
    position = 1,
    parentId: number | null = null
  ) => {
    const dt = dl.querySelector("dt");
    if (dt) processNode(dt, position, parentId);
    else handleNextNode(dl);
  };

  const parentdl = doc.body.querySelector("dl");
  if (parentdl) processFolder(parentdl);
  return { bookmarks, folders };
};

const htmlContent = fs.readFileSync("./uploads/chromeBookmarks.html", "utf8");
const filename = "./uploads/test.json";

fs.writeFile(
  filename,
  JSON.stringify(testParsing(htmlContent), null, 4),
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + filename);
    }
  }
);
