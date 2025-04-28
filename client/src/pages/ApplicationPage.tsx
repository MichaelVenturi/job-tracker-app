import { useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { appReset, getAppById } from "../redux/apps/appSlice";
import { useParams, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ApplicationPage = () => {
  const { curApp, isLoading, isError, isSuccess, message } = useSelector((state) => state.apps);

  const dispatch = useDispatch();
  const { id } = useParams();
  const localApp = useLocation().state?.app;

  const app = localApp ?? curApp;

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
    <div className="flex flex-col mx-20">
      <Link to="/application-list" className="btn btn-success">
        Go back
      </Link>

      {app.jobTitle}
    </div>
  );
};
export default ApplicationPage;
