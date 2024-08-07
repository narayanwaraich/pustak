import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Folder, Bookmark } from "../models";
import { uploadFile } from "../middleware/fileUploader";
import { parseBookmarks } from "../util/parseBookmarks";
// import { BulkBookmark, BulkFolder } from "../util/parseBookmarks";
const router = express.Router();

async function saveIconAsFile(iconData: string): Promise<string> {
  // Extract the MIME type and base64 data
  const matches = iconData.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return ""; // Return empty string if the icon data is invalid
  }

  const mimeType = matches[1];
  const base64Data = matches[2];
  const fileExtension = mimeType.split("/")[1];

  // Generate a unique filename
  const filename = `${crypto.randomBytes(16).toString("hex")}.${fileExtension}`;
  const filePath = path.join(process.cwd(), "public", "icons", filename);

  // Ensure the directory exists
  await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

  // Write the file
  await fs.promises.writeFile(filePath, base64Data, "base64");

  // Return the relative path to be stored in the database
  return path.join("icons", filename).replace(/\\/g, "/");
}

router.post("/", uploadFile, async (req, res) => {
  try {
    const file = req.file;
    // console.log("\x1Bc");
    if (file) {
      const htmlContent = fs.readFileSync(file.path, "utf8");
      // Change the 'userId: null' in parseBookmarks.ts to the proper user id.
      const { bookmarks, folders } = parseBookmarks(htmlContent);
      const folderIdMap = new Map<number, number>();
      let remainingFolders = [...folders];

      while (remainingFolders.length > 0) {
        try {
          const batchFolders = remainingFolders.filter(
            (folder) =>
              folder.temp_parent_id === null ||
              folderIdMap.has(folder.temp_parent_id)
          );
          const createdFolders = await Folder.bulkCreate(
            batchFolders.map((folder) => ({
              ...folder,
              parentId: folder.temp_parent_id
                ? folderIdMap.get(folder.temp_parent_id)
                : null,
            }))
          );
          createdFolders.forEach((folder, index) => {
            folderIdMap.set(batchFolders[index].temp_id, folder.id);
          });

          remainingFolders = remainingFolders.filter(
            (folder) => !batchFolders.includes(folder)
          );
        } catch (error) {
          console.log(error);
        }
      }

      const processedBookmarks = await Promise.all(
        bookmarks.map(async (bookmark) => {
          let iconPath = "";
          if (bookmark.icon?.startsWith("data:")) {
            iconPath = await saveIconAsFile(bookmark.icon);
          }
          return {
            ...bookmark,
            icon: iconPath, // Now stores the path to the locally saved icon
            parentId: bookmark.temp_parent_id
              ? folderIdMap.get(bookmark.temp_parent_id)
              : null,
          };
        })
      );

      try {
        await Bookmark.bulkCreate(processedBookmarks);
      } catch (error) {
        console.log(error);
      }

      res.status(200).json({
        message: "File uploaded successfully",
        file: file,
      });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "An error occurred while uploading the file",
    });
  }
});

export default router;
