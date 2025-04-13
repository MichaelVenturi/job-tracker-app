import { useState, useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { toast } from "react-toastify";
import { appReset, getApplications } from "../redux/apps/appSlice";
import AppItem from "../components/AppItem";
import { IApplication } from "../types/stateTypes";

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

  const filter = (e: React.MouseEvent<HTMLElement>) => {
    const field = e.currentTarget.id as AppKey;

    let sortD = 1;
    if (curKey && curKey === field) {
      sortD = curSortDir * -1;
    }
    setCurKey(field);
    setCurSortDir(sortD);
    console.log(curSortDir, sortD);
    const sortedData = [...sortedApps].sort((a, b) => {
      let valA: string = a[field]!.toLocaleLowerCase();
      let valB = b[field]!.toLocaleLowerCase();
      if (field === "dateApplied") {
        const dateA = Date.parse(valA);
        const dateB = Date.parse(valB);
        return (dateA - dateB) * sortD;
      }
      if (field === "status") {
        // very cheeky solution since the rest of the status fields get sorted how I want them alphabetically
        valA = valA === "offer" ? "".concat("a", valA) : valA;
        valB = valB === "offer" ? "".concat("a", valB) : valB;
      }
      return valA!.localeCompare(valB!) * sortD;
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
  );
};
export default Applications;
