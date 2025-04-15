import { IApplication } from "../types/stateTypes";

interface AppItemProps {
  app: IApplication;
}

const AppItem: React.FC<AppItemProps> = ({ app }) => {
  return (
    <tr className="hover:bg-base-300">
      <th className="overflow-hidden overflow-ellipsis">{app.jobTitle}</th>
      <th className="overflow-hidden overflow-ellipsis">{app.companyName}</th>
      <th className="overflow-hidden overflow-ellipsis">{app.location}</th>
      <th className="overflow-hidden overflow-ellipsis">{app.status}</th>
      <th className="overflow-hidden overflow-ellipsis">{new Date(app.dateApplied).toLocaleDateString()}</th>
      <th className="relative">
        <div className="group flex flex-col">
          <a href="https://google.com" target="_blank" rel="noreferrer">
            To Job details
          </a>
          <span className="fixed ml-4 mt-6 z-50 badge badge-ghost badge-xs opacity-0 transition-all group-hover:opacity-100 delay-150">
            {app.link}
          </span>
        </div>
      </th>
    </tr>
  );
};
export default AppItem;
