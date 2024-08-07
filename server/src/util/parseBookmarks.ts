import { JSDOM } from "jsdom";
import { FolderType, BookmarkType } from "../typings/router";
import validate from "./validator";
// import * as fs from "fs";

export interface BulkFolder extends Omit<FolderType, "parentId"> {
  temp_parent_id: number | null;
  temp_id: number;
}

export interface BulkBookmark extends Omit<BookmarkType, "parentId"> {
  temp_parent_id: number | null;
}

export const parseBookmarks = (htmlContent: string) => {
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
      userId: null,
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
      userId: null,
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

  const processFolder = (parentdl: Element, parentId: number | null = null) => {
    let position = 0;
    for (const element of parentdl.children) {
      if (element.nodeName === "DT") {
        const child = element.firstElementChild;
        if (child) addNode(child, position, parentId);
      } else if (element.nodeName === "DL") {
        if (element.querySelector("dt")) processFolder(element, id);
      }
      position += 100;
    }
  };

  const parentdl = doc.body.querySelector("dl");
  if (parentdl) processFolder(parentdl);
  return { bookmarks, folders };
};

/* const htmlContent = fs.readFileSync("./uploads/chromeBookmark.html", "utf8");
const filename = "./uploads/test.json";

fs.writeFile(
  filename,
  JSON.stringify(parseBookmarksInLoop(htmlContent), null, 4),
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + filename);
    }
  }
); */
