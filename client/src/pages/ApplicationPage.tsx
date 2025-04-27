import { useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { appReset, getAppById } from "../redux/apps/appSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ApplicationPage = () => {
  const { curApp, isLoading, isError, isSuccess, message } = useSelector((state) => state.apps);

  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (isSuccess) {
      dispatch(appReset());
    }
  }, [dispatch, isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getAppById(id!));
  }, [dispatch, id, isError, message]);

  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isError) {
    return <h1>error</h1>;
  }
  return <div>{curApp?.jobTitle}</div>;
};
export default ApplicationPage;
