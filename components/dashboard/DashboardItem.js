import { useRouter } from "next/navigation";

export default function DashboardItem({ metadata }) {
  const { id, name, description, creator, dashboard_id } = metadata;
  const router = useRouter();

  const goToDashboard = () => {
    router.refresh("/dashboards/" + dashboard_id);
  };

  return (
    <li
      key={id}
      className="border-green-500 rounded flex"
      onClick={goToDashboard}
    >
      <p>{name}</p>
      <p>{description}</p>
      <p>{creator}</p>
    </li>
  );
}
