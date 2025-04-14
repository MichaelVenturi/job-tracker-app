import { useState, useEffect } from "react";
import { useAppSelector as useSelector, useAppDispatch as useDispatch } from "../redux/store";
import { appReset, createApplication, getApplications } from "../redux/apps/appSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface FormData {
  jobTitle: string;
  companyName: string;
  link: string;
  location: string;
  notes: string;
}

const NewApplication = () => {
  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    companyName: "",
    link: "",
    location: "",
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
      <h1 className="md:text-3xl text-2xl font-bold">Log an application</h1>
      <hr className="my-5 w-[80%] m-auto" />
      <form onSubmit={onSubmit} className="lg:flex flex-col items-center justify-center">
        <div className="flex lg:flex-row flex-col lg:w-[75%] my-5 gap-2 justify-center items-center">
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            className="input input-success input-lg md:w-[50%]"
            placeholder="position title"
            onChange={onChange}
            value={formData.jobTitle}
            required
            autoComplete="off"
          />
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="input input-success input-lg md:w-[50%]"
            placeholder="name of company"
            onChange={onChange}
            value={formData.companyName}
            required
            autoComplete="off"
          />
        </div>
        <div className="flex lg:flex-row flex-col lg:w-[75%] my-5 gap-2 justify-center items-center">
          <input
            type="text"
            id="location"
            name="location"
            className="input input-success input-lg md:w-[50%]"
            placeholder="location"
            onChange={onChange}
            value={formData.location}
            required
            autoComplete="off"
          />
          <input
            type="text"
            id="link"
            name="link"
            className={`input input-lg md:w-[50%] input-${validLink ? "success" : "error"}`}
            placeholder="link to job details"
            onChange={onChange}
            value={formData.link}
            required
            autoComplete="off"
          />
        </div>
        <textarea
          id="notes"
          name="notes"
          className="textarea textarea-success w-[50%]"
          placeholder="write any additional notes here"
          onChange={onChange}
          value={formData.notes}
        />
        <button
          type="submit"
          className="btn btn-success btn-lg w-[50%] my-5"
          disabled={Object.entries(formData).some(([key, value]) => value.length < 1 && key !== "notes")}>
          Create entry
        </button>
      </form>
    </div>
  );
};
export default NewApplication;
