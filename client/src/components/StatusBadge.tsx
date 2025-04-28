interface IStatusBadgeProps {
  status: string;
}

const badges = {
  Pending: "badge-warning",
  Sent: "badge-ghost",
  Rejected: "badge-error",
  Offer: "badge-success",
};

type badgeKey = keyof typeof badges;

const StatusBadge: React.FC<React.PropsWithChildren<IStatusBadgeProps>> = ({ status, children }) => {
  return <span className={`w-fit h-fit badge badge-lg ${badges[status as badgeKey]}`}>{`${children ?? ""}${status}`}</span>;
};
export default StatusBadge;
