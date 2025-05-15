import { useState, useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { toast } from "react-toastify";
import { appReset, getApplications } from "../redux/apps/appSlice";
import AppItem from "../components/AppItem";
import { IApplication } from "../types/stateTypes";
import Searchbar from "../components/Searchbar";
import Modal, { Styles } from "react-modal";

type SortableFields = Pick<IApplication, "jobTitle" | "companyName" | "location" | "dateApplied" | "status">;
type AppKey = keyof SortableFields;

// this is the order of priority I want for multilevel sorting
const allKeys: AppKey[] = ["status", "dateApplied", "companyName", "jobTitle", "location"];

const customStyles: Styles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
    color: "white",
    background: "black",
  },
};

Modal.setAppElement("#root");

const Applications = () => {
  const { apps, isError, isLoading, isSuccess, message } = useSelector((state) => state.apps);
  const [sortedApps, setSortedApps] = useState(apps);
  const [curSortDir, setCurSortDir] = useState(1);
  const [curKey, setCurKey] = useState<AppKey | null>(null);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

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

  const onSearch = (text: string) => {
    if (text.length > 3) {
      setQuery(text);
    } else {
      setQuery("");
    }
  };

  const matchesQuery = (app: IApplication) => {
    const nonqueryKey = (key: string) => key === "_id" || key === "user" || key === "link" || key === "notes" || key === "updatedAt";
    for (const [key, val] of Object.entries(app)) {
      // dont compare for certain keys
      if (nonqueryKey(key)) continue;
      const compareVal = val.toString().toLocaleLowerCase();
      if (compareVal.includes(query.toLocaleLowerCase())) return true;
    }
    return false;
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className="w-full max-w-full px-2 mb-2 xl:mx-10">
      <Searchbar onSearch={onSearch} />
      <button className="btn" onClick={openModal}>
        modal
      </button>
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
            {sortedApps.map((a) => {
              if (matchesQuery(a)) return <AppItem key={a._id} app={a} />;
            })}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Filters">
        <h2>Filters</h2>
        <p>test</p>
      </Modal>
    </div>
  );
};
export default Applications;
