// import { Bookmark as BookmarkType } from "../../../../types/services";
import { baseUrl } from "@/utils/config";

/* export interface BookmarkProps {
  bookmark: BookmarkType;
} */

export interface BookmarkProps {
  /**
   * Bookmark URL
   */
  url: string;
  /**
   * Bookmark Title
   */
  title: string;
  /**
   * Bookmark Icon file
   */
  icon: string;
}

const Bookmark = ({ url, title, icon }: BookmarkProps) => {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img
          alt={title}
          src={baseUrl + "/static/" + icon}
          className="h-6 w-6 flex-none rounded-full bg-gray-50"
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {title}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{url}</p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {/* Last seen <time dateTime={bookmark.addDate}>{person.lastSeen}</time> */}
        </p>
      </div>
    </li>
  );
};

export default Bookmark;
