interface Bookmark {
  name: string;
  url: string;
  add_date: string | null;
  icon: string | null;
  folder_id: number | null;
  position: number;
}

interface Folder {
  id: number;
  name: string;
  add_date: string | null;
  last_modified: string | null;
  parent_id: number | null;
  position: number;
}

function parseBookmarksForDatabase(htmlContent: string): {
  bookmarks: Bookmark[];
  folders: Folder[];
} {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  const bookmarks: Bookmark[] = [];
  const folders: Folder[] = [];
  let folderId = 0;

  function processNode(
    node: Element,
    parentId: number | null = null,
    position: number = 1,
  ): number {
    if (node.tagName === "A") {
      // It's a bookmark
      bookmarks.push({
        name: node.textContent || "",
        url: node.getAttribute("href") || "",
        add_date: node.getAttribute("add_date"),
        icon: node.getAttribute("icon"),
        folder_id: parentId,
        position: position,
      });
      return position + 1;
    } else if (node.tagName === "H3") {
      // It's a folder
      folderId++;
      folders.push({
        id: folderId,
        name: node.textContent || "",
        add_date: node.getAttribute("add_date"),
        last_modified: node.getAttribute("last_modified"),
        parent_id: parentId,
        position: position,
      });

      // Process child nodes
      const dl = node.nextElementSibling;
      if (dl && dl.tagName === "DL") {
        let childPosition = 1;
        for (const childNode of Array.from(dl.children)) {
          if (childNode.tagName === "DT") {
            const firstChild = childNode.firstElementChild;
            if (firstChild) {
              childPosition = processNode(firstChild, folderId, childPosition);
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
}

// Usage
// const htmlContent = fs.readFileSync('path/to/your/bookmarks.html', 'utf8');
const { bookmarks, folders } = parseBookmarksForDatabase(htmlContent);

console.log("Bookmarks:", JSON.stringify(bookmarks, null, 2));
console.log("Folders:", JSON.stringify(folders, null, 2));
