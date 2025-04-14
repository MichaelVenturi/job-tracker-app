import { IApplication } from "../types/stateTypes";

interface AppItemProps {
  app: IApplication;
}

const AppItem: React.FC<AppItemProps> = ({ app }) => {
  return (
    <tr className=" hover:bg-base-300">
      <th>{app.jobTitle}</th>
      <th>{app.companyName}</th>
      <th>{app.location}</th>
      <th>{app.status}</th>
      <th>{new Date(app.dateApplied).toLocaleDateString()}</th>
      <th>
        <a href="https://google.com" target="_blank" rel="noreferrer">
          To Job details
        </a>
      </th>
    </tr>
  );
};
export default AppItem;
