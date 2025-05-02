import { useState, useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { appReset, createApplication, getApplications } from "../redux/apps/appSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface IFormData {
  jobTitle: string;
  companyName: string;
  link: string;
  location: string;
  status: string;
  notes: string;
}

const NewApplication = () => {
  const [formData, setFormData] = useState<IFormData>({
    jobTitle: "",
    companyName: "",
    link: "",
    location: "",
    status: "Sent",
    notes: "",
  });
  const [validLink, setValidLink] = useState(true);
  const { apps, isLoading, isError, isSuccess, message } = useSelector((state) => state.apps);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/application-list");
    }
    dispatch(appReset());
  }, [dispatch, isError, isSuccess, message, navigate]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      <h1 className="md:text-3xl text-2xl font-bold">Log an application</h1>
      <hr className="my-5 w-[80%] m-auto" />
      <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
        <div className="flex lg:flex-row flex-col w-full lg:w-[80%] xl:w-[65%] my-2.5 gap-2 justify-center items-center">
          <div className="w-full md:w-[75%] lg:w-[50%] px-10 md:px-0 flex flex-col md:items-start">
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
          <div className="w-full md:w-[75%] lg:w-[50%] px-10 md:px-0 flex flex-col md:items-start">
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
        <div className="flex lg:flex-row flex-col w-full lg:w-[80%] xl:w-[65%] my-2.5 gap-2 justify-center items-center">
          <div className="w-full md:w-[75%] lg:w-[50%] px-10 md:px-0 flex flex-col md:items-start">
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
          <div className="w-full md:w-[75%] lg:w-[50%] px-10 md:px-0 flex flex-col md:items-start">
            <label htmlFor="link" className="text-neutral-400">
              Link to details
            </label>
            <input
              type="text"
              id="link"
              name="link"
              className={`input input-lg w-full ${validLink ? "input-success" : "input-error"}`}
              placeholder="link to job details"
              onChange={onChange}
              value={formData.link}
              required
              autoComplete="off"
            />
          </div>
          <div className="w-full md:w-[75%] lg:w-[50%] max-md:px-10 flex flex-col md:items-start">
            <label htmlFor="status" className="text-neutral-400">
              Status
            </label>
            <select name="status" id="status" className="select select-lg select-success w-full" onChange={onChange} value={formData.status} required>
              <option value={"Sent"}>Sent</option>
              <option value={"Pending"}>Pending</option>
              <option value={"Rejected"}>Rejected</option>
              <option value={"Offer"}>Offer</option>
            </select>
          </div>
        </div>

        <div className="w-full md:w-[75%] lg:w-[50%] px-10 md:px-0 flex flex-col md:items-start">
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
        <div className="my-5 flex w-full md:w-[75%] lg:w-[50%] px-10 md:px-0  gap-4">
          <button
            type="submit"
            className="btn btn-success btn-lg w-full flex-1"
            disabled={Object.entries(formData).some(([key, value]) => value.length < 1 && key !== "notes")}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewApplication;
