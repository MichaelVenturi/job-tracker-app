import { IApplication } from "../types/stateTypes";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

interface AppItemProps {
  app: IApplication;
}

const AppItem: React.FC<AppItemProps> = ({ app }) => {
  return (
    <tr className="hover:bg-base-300 bg-clip-border">
      <td className="overflow-hidden overflow-ellipsis">
        <Link to={`/application/${app._id}`} state={{ app }}>
          {app.jobTitle}
        </Link>
      </td>
      <td className="overflow-hidden overflow-ellipsis">{app.companyName}</td>
      <td className="overflow-hidden overflow-ellipsis">{app.location}</td>
      <td className="overflow-hidden overflow-ellipsis">
        <StatusBadge status={app.status} />
      </td>
      <td className="overflow-hidden overflow-ellipsis">{new Date(app.dateApplied).toLocaleDateString()}</td>
      <td className="relative">
        <div className="group flex flex-col">
          <a href="https://google.com" target="_blank" rel="noreferrer" className="underline">
            To Job details
          </a>
          <span className="fixed ml-4 mt-6 z-50 badge badge-ghost badge-xs opacity-0 transition-all group-hover:opacity-100 delay-150">
            {app.link}
          </span>
        </div>
      </td>
    </tr>
  );
};
export default AppItem;
