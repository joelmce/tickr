import { useRouter } from "next/navigation";
import { DeleteConfirmationButton } from "../ui/DeleteConfirmationButton";
import { Button } from "@mui/joy";

export default function DashboardItem({ metadata }) {
  const { id, name, description, dashboard_id } = metadata;
  const router = useRouter();

  const goToDashboard = () => {
    router.replace("/dashboards/" + dashboard_id);
  };

  return (
    <li
      key={id}
      className="list-none rounded border border-white p-4"
      
    >
      <h3 className="font-extrabold">{name}</h3>
      <p>{description}</p>
      <Button color="success" variant="outlined" onClick={goToDashboard}>
        View
      </Button>
      <DeleteConfirmationButton name={name} dashboard_id={dashboard_id}/>
    </li>
  );
}
