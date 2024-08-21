import { getTopLevelFolders } from "@/lib/api/folders";
import { useEffect /* useState */ } from "react";
const HitAndTrial = () => {
  // const [folders, setFolders] = useState([]);
  // const data = await getTopLevelFolders();
  // console.log(data);
  useEffect(() => {
    async function fetchData() {
      const response = await getTopLevelFolders();
      console.log(response);
      // setFolders(response);
    }
    fetchData();
  }, []);

  return <></>;
};

export default HitAndTrial;
