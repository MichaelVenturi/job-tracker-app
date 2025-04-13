import { useState, useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { toast } from "react-toastify";
import { appReset, getApplications } from "../redux/apps/appSlice";
import AppItem from "../components/AppItem";
import { IApplication } from "../types/stateTypes";
import { cursorTo } from "readline";

type SortableFields = Pick<IApplication, "jobTitle" | "companyName" | "location" | "dateApplied" | "status">;
type AppKey = keyof SortableFields;

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

  const setSortDirection = (key: AppKey) => {
    if (curKey && curKey === key) {
      // if this isnt the first sort, and if we are sorting the same key we just sorted, sort the opposite way
      setCurSortDir(curSortDir * -1);
    } else {
      setCurKey(key);
      setCurSortDir(1);
    }
  };

  const filter = (e: React.MouseEvent<HTMLElement>) => {
    const field = e.currentTarget.id as AppKey;
    setSortDirection(field);

    const sortedData = [...sortedApps].sort((a, b) => {
      const valA = a[field]!.toLocaleLowerCase();
      const valB = b[field]!.toLocaleLowerCase();
      return valA!.localeCompare(valB!) * curSortDir;
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
    <div className="overflow-x-auto mx-10 rounded-box border border-success/50 w-full">
      <table className="table table-fixed">
        <thead>
          <tr>
            <th onClick={filter} id="jobTitle">
              <span className="hover:cursor-pointer">Job Title</span>
            </th>
            <th onClick={filter} id="companyName">
              <span className="hover:cursor-pointer">Company</span>
            </th>
            <th onClick={filter} id="location">
              <span className="hover:cursor-pointer">Location</span>
            </th>
            <th onClick={filter} id="status">
              <span className="hover:cursor-pointer">Status</span>
            </th>
            <th onClick={filter} id="dateApplied">
              <span className="hover:cursor-pointer">Date Applied</span>
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
  );
};
export default Applications;
