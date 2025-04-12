import { IApplication } from "../types/stateTypes";

interface AppItemProps {
  app: IApplication;
}

const AppItem: React.FC<AppItemProps> = ({ app }) => {
  return (
    <div className="flex flex-row">
      <p>{app.jobTitle}</p>
      <p>{app.companyName}</p>
      <p>{app.location}</p>
    </div>
  );
};
export default AppItem;
