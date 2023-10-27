import { useRouter } from "next/navigation";
import { DeleteConfirmationButton } from "../ui/DeleteConfirmationButton";
import { Button } from "@mui/joy";
import Link from "next/link";

export default function DashboardItem({ metadata }) {
  const { id, name, description, dashboard_id } = metadata;
  const router = useRouter();

  const goToDashboard = () => {
    router.replace("/dashboards/" + dashboard_id);
  };

  return (
    <li key={id} className="list-none rounded border border-white p-4">
      <h3 className="font-extrabold">{name}</h3>
      <p>{description}</p>
      <Link href={`/dashboards/${dashboard_id}`}>
        <Button color="success" variant="outlined">
          View
        </Button>
      </Link>
      <DeleteConfirmationButton name={name} dashboard_id={dashboard_id} />
    </li>
  );
}
