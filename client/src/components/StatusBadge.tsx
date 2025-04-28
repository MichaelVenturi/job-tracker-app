interface IStatusBadgeProps {
  status: string;
  large?: boolean;
}

const badges = {
  Pending: "badge-warning",
  Sent: "badge-ghost",
  Rejected: "badge-error",
  Offer: "badge-success",
};

type badgeKey = keyof typeof badges;

const StatusBadge: React.FC<React.PropsWithChildren<IStatusBadgeProps>> = ({ status, large = false, children }) => {
  return <span className={`w-fit h-fit badge ${large && "badge-lg"} ${badges[status as badgeKey]}`}>{`${children ?? ""} ${status}`}</span>;
};
export default StatusBadge;
