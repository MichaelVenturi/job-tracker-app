import { useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { appReset, getAppById } from "../redux/apps/appSlice";
import { useParams, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IApplication } from "../types/stateTypes";
import StatusBadge from "../components/StatusBadge";

const ApplicationPage = () => {
  const { curApp, isLoading, isError, isSuccess, message } = useSelector((state) => state.apps);

  const dispatch = useDispatch();
  const { id } = useParams();
  const localApp = useLocation().state?.app;

  const app: IApplication = localApp ?? curApp;

  useEffect(() => {
    if (isSuccess) {
      dispatch(appReset());
    }
  }, [dispatch, isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!localApp || localApp._id !== id) {
      dispatch(getAppById(id!));
    }
  }, [dispatch, id, isError, localApp, message]);

  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isError) {
    return <h1>error</h1>;
  }
  return (
    <div className="flex flex-col mx-auto px-10 md:px-20 mb-10 gap-5 w-full items-center justify-center md:items-start">
      <Link to="/application-list" className="btn btn-success">
        Go back
      </Link>

      <h1 className="text-3xl text-center md:text-start md:text-4xl font-bold">{app.jobTitle}</h1>
      <div className="flex flex-col md:flex-row items-center gap-5 w-full">
        <h3 className="badge badge-lg lg:badge-xl badge-info text-wrap h-fit text-center">
          at {app.companyName}, {app.location}
        </h3>
        <StatusBadge status={app.status} large={true}>
          Status:
        </StatusBadge>
      </div>

      <div className="stats stats-vertical md:stats-horizontal shadow rounded-lg bg-base-200">
        <div className="stat">
          <span className="stat-title text-accent">Date applied</span>
          <span className="stat-value text-2xl">{new Date(app.dateApplied).toLocaleDateString()}</span>
          <span className="stat-desc">{new Date(app.dateApplied).toLocaleTimeString()}</span>
        </div>
        <div className="stat">
          <span className="stat-title text-accent">Last updated</span>
          <span className="stat-value text-2xl">{new Date(app.updatedAt).toLocaleDateString()}</span>
          <span className="stat-desc">{new Date(app.updatedAt).toLocaleTimeString()}</span>
        </div>
        <div className="stat">
          <span className="stat-title text-accent">Link to details</span>
          <a href={app.link} target="_blank" rel="noreferrer" className="stat-value text-2xl hover:text-success">
            Click here
          </a>
          <span className="stat-desc">to: {new URL(app.link).hostname}</span>
        </div>
      </div>
      {app.notes ? (
        <div className="stats shadow rounded-lg bg-base-200 w-full">
          <div className="stat">
            <span className="stat-title text-accent">Additional notes</span>
            <span className="stat-value text-sm text-wrap">{app.notes}</span>
          </div>
        </div>
      ) : null}
      <button className="btn btn-neutral btn-wide">Edit</button>
    </div>
  );
};
export default ApplicationPage;
