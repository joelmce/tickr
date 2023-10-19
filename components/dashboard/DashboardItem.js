import { Paper } from "@mui/material";
import styled from "@mui/material/styles";
import { redirect } from "next/navigation";

export default function DashboardItem({ metadata }) {
  const { id, name, description, creator } = metadata;

  const goToDashboard = () => {
    redirect("/" + id);
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
