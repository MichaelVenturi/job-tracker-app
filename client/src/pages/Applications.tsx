import { useState, useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { toast } from "react-toastify";
import { appReset, getApplications } from "../redux/apps/appSlice";
import AppItem from "../components/AppItem";
import { IApplication } from "../types/stateTypes";
import Searchbar from "../components/Searchbar";

type SortableFields = Pick<IApplication, "jobTitle" | "companyName" | "location" | "dateApplied" | "status">;
type AppKey = keyof SortableFields;

// this is the order of priority I want for multilevel sorting
const allKeys: AppKey[] = ["status", "dateApplied", "companyName", "jobTitle", "location"];

const Applications = () => {
  const { apps, isError, isLoading, isSuccess, message } = useSelector((state) => state.apps);
  const [sortedApps, setSortedApps] = useState(apps);
  const [curSortDir, setCurSortDir] = useState(1);
  const [curKey, setCurKey] = useState<AppKey | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (apps.length === 0) {
      dispatch(getApplications());
    }
    setSortedApps(apps);
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(appReset());
    }
  }, [apps.length, apps, dispatch, isError, isSuccess, message]);

  const filter = (e: React.MouseEvent<HTMLElement>) => {
    const field = e.currentTarget.id as AppKey;

    let sortD = 1;
    if (curKey && curKey === field) {
      sortD = curSortDir * -1;
    }
    setCurKey(field);
    setCurSortDir(sortD);

    const sortKeys: AppKey[] = [field, ...allKeys.filter((k) => k !== field)];

    const sortedData = [...sortedApps].sort((a, b) => {
      // tiebreaker sorting
      for (const key of sortKeys) {
        console.log("sorting by ", key);
        let valA: string = a[key]!.toLocaleLowerCase();
        let valB = b[key]!.toLocaleLowerCase();
        let res = 0;
        if (key === "dateApplied") {
          const dateA = Date.parse(valA);
          const dateB = Date.parse(valB);
          res = (dateA - dateB) * sortD;
          if (res !== 0) return res;
        }
        if (key === "status") {
          // very cheeky solution since the rest of the status fields get sorted how I want them alphabetically
          valA = valA === "offer" ? "".concat("a", valA) : valA;
          valB = valB === "offer" ? "".concat("a", valB) : valB;
        }
        res = valA!.localeCompare(valB!) * sortD;
        if (res !== 0) return res;
      }
      return 0; // all fields were equal, dont move anything
    });
    setSortedApps(sortedData);
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className="w-full max-w-full px-2 mb-2 xl:mx-10">
      <Searchbar />
      <div className="overflow-x-auto rounded-box border border-success/50">
        <table className="table table-auto">
          <thead>
            <tr>
              <th onClick={filter} id="jobTitle" className="hover:cursor-pointer hover:bg-base-300">
                Job Title
              </th>
              <th onClick={filter} id="companyName" className="hover:cursor-pointer hover:bg-base-300">
                Company
              </th>
              <th onClick={filter} id="location" className="hover:cursor-pointer hover:bg-base-300">
                Location
              </th>
              <th onClick={filter} id="status" className="hover:cursor-pointer hover:bg-base-300">
                Status
              </th>
              <th onClick={filter} id="dateApplied" className="hover:cursor-pointer hover:bg-base-300">
                Date Applied
              </th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {sortedApps.map((a) => (
              <AppItem key={a._id} app={a} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Applications;
