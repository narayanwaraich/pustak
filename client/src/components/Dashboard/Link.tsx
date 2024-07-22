import { Link as LinkType } from "../../types/services";

const Link = ({ link }: { link: LinkType }) => {
  // console.log(data);
  return (
    <li key={link.id} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        {/* <img alt="" src={person.imageUrl} className="h-12 w-12 flex-none rounded-full bg-gray-50" /> */}
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {link.title}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
            {link.url}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="mt-1 text-xs leading-5 text-gray-500">
          {/* Last seen <time dateTime={link.addDate}>{person.lastSeen}</time> */}
        </p>
      </div>
    </li>
  );
};

export default Link;
