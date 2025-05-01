import { useState, useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { appReset, createApplication, getAppById, getApplications, setCurApp } from "../redux/apps/appSlice";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

interface IFormData {
  jobTitle: string;
  companyName: string;
  link: string;
  location: string;
  status: string;
  notes: string;
}

type EditAppParams = {
  id: string;
};

const EditApplication = () => {
  const [formData, setFormData] = useState<IFormData>({
    jobTitle: "",
    companyName: "",
    link: "",
    location: "",
    status: "Sent",
    notes: "",
  });
  const [validLink, setValidLink] = useState(true);
  const { apps, curApp, isLoading, isError, isSuccess, message } = useSelector((state) => state.apps);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<EditAppParams>();
  const localApp = useLocation().state?.app;

  useEffect(() => {
    if (isSuccess) {
      console.log("ueh2");
      dispatch(appReset());
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    console.log("ueh");
    if (isError) {
      toast.error(message);
    }
    if (!localApp || localApp._id !== id) {
      dispatch(getAppById(id!));
    } else {
      dispatch(setCurApp(localApp));
    }
  }, [dispatch, id, isError, localApp, message]);

  useEffect(() => {
    setFormData({
      jobTitle: curApp?.jobTitle ?? "",
      companyName: curApp?.companyName ?? "",
      link: curApp?.link ?? "",
      location: curApp?.location ?? "",
      status: curApp?.status ?? "Sent",
      notes: curApp?.notes ?? "",
    });
  }, [curApp]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidUrl(formData.link)) {
      toast.error("invalid url");
      return;
    }
    if (apps.length === 0) {
      dispatch(getApplications());
    }

    const req = {
      jobTitle: formData.jobTitle,
      companyName: formData.companyName,
      location: formData.location,
      link: formData.link,
      ...(formData.notes.trim().length > 0 && { notes: formData.notes }),
    };
    dispatch(createApplication(req));
  };

  const isValidUrl = (link: string): boolean => {
    let url;
    try {
      url = new URL(link);
    } catch (err: unknown) {
      console.log(err);
      setValidLink(false);
      return false;
    }
    setValidLink(true);
    return url.protocol === "http:" || url.protocol === "https:";
  };

  if (isLoading) {
    return <h1>loading</h1>;
  }
  return (
    <div className="text-center w-full">
      <h1 className="md:text-3xl text-2xl font-bold">Edit application details</h1>
      <hr className="my-5 w-[80%] m-auto" />
      <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
        <div className="flex lg:flex-row flex-col w-full lg:w-[75%] my-2.5 gap-2 justify-center items-center">
          <div className="w-full md:w-[50%] px-10 md:px-0  flex flex-col md:items-start">
            <label htmlFor="jobTitle" className="text-neutral-400">
              Job title
            </label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              className="input input-success input-lg w-full"
              placeholder="position title"
              onChange={onChange}
              value={formData.jobTitle}
              required
              autoComplete="off"
            />
          </div>
          <div className="w-full md:w-[50%] px-10 md:px-0  flex flex-col md:items-start">
            <label htmlFor="companyName" className="text-neutral-400">
              Company name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="input input-success input-lg w-full"
              placeholder="name of company"
              onChange={onChange}
              value={formData.companyName}
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="flex lg:flex-row flex-col w-full lg:w-[75%] my-2.5 gap-2 justify-center items-center">
          <div className="w-full md:w-[50%] px-10 md:px-0  flex flex-col md:items-start">
            <label htmlFor="location" className="text-neutral-400">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="input input-success input-lg w-full"
              placeholder="location"
              onChange={onChange}
              value={formData.location}
              required
              autoComplete="off"
            />
          </div>
          <div className="w-full md:w-[50%] px-10 md:px-0  flex flex-col md:items-start">
            <label htmlFor="link" className="text-neutral-400">
              Link to details
            </label>
            <input
              type="text"
              id="link"
              name="link"
              className={`input input-lg md:w-full input-${validLink ? "success" : "error"}`}
              placeholder="link to job details"
              onChange={onChange}
              value={formData.link}
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="w-full md:w-[50%] px-10 md:px-0  flex flex-col mt-5 md:items-start">
          <label htmlFor="notes" className="text-neutral-400">
            additional notes
          </label>
          <textarea
            id="notes"
            name="notes"
            className="textarea textarea-success w-full"
            placeholder="write any additional notes here"
            onChange={onChange}
            value={formData.notes}
          />
        </div>
        <button
          type="submit"
          className="btn btn-success btn-lg md:w-[50%] my-5"
          disabled={Object.entries(formData).some(([key, value]) => value.length < 1 && key !== "notes")}>
          Submit Changes
        </button>
      </form>
    </div>
  );
};
export default EditApplication;
