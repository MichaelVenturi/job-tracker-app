import { useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { toast } from "react-toastify";
import { appReset, getApplications } from "../redux/apps/appSlice";
import AppItem from "../components/AppItem";

const Applications = () => {
  const { apps, isError, isLoading, isSuccess, message } = useSelector((state) => state.apps);

  const dispatch = useDispatch();
  useEffect(() => {
    if (apps.length === 0) {
      dispatch(getApplications());
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(appReset());
    }
  }, [apps.length, dispatch, isError, isSuccess, message]);

  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      {apps.map((a) => (
        <AppItem key={a._id} app={a} />
      ))}
    </div>
  );
};
export default Applications;
