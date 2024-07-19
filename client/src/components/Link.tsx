import { Link as LinkType } from "../types/services";

const Link = ({ data }: { data: LinkType }) => {
  console.log(data);
  return (
    <div>
      <a href={data.url}>{data.title}</a>
    </div>
  );
};

export default Link;
