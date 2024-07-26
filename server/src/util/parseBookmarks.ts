/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { JSDOM } from "jsdom";
import { FolderType, BookmarkType } from "../typings/router";
// import { validateFolder, validateBookmark } from "./validator";
import validate from "./validator";
// import * as fs from "fs";

export interface BulkFolder extends Omit<FolderType, "parentId"> {
  temp_parent_id: number | null;
  temp_id: number;
}

export interface BulkBookmark extends Omit<BookmarkType, "parentId"> {
  temp_parent_id: number | null;
}

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

// Usage
// const htmlContent = fs.readFileSync("path/to/your/bookmarks.html", "utf8");
// const { bookmarks, folders } = parseBookmarksForDatabase(htmlContent);

// console.log("Bookmarks:", JSON.stringify(bookmarks, null, 2));
// console.log("Folders:", JSON.stringify(folders, null, 2));

// const filename = "../../uploads/test.json";

// fs.writeFile(
//   filename,
//   JSON.stringify(parseBookmarksForDatabase(data), null, 4),
//   function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("JSON saved to " + filename);
//     }
//   }
// );
