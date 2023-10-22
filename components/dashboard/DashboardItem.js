"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DashboardItem({ metadata }) {
  const { id, name, description, creator, dashboard_id } = metadata;
  const router = useRouter();
  const [isHovered, setHovered] = useState(false);

  const goToDashboard = () => {
    router.replace("/dashboards/" + dashboard_id);
  };
  const handleMouseOver = () => {
    setHovered(!isHovered);
  };

  const handleMouseExit = () => {
    setHovered(!isHovered);
  };

  return (
    <li
      key={id}
      className="list-none rounded cursor-pointer border border-white p-4 hover:bg-green-900"
      onClick={goToDashboard}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseExit}
    >
      <h3 className="font-extrabold">{name}</h3>
      <p>{description}</p>
      <DeleteOutlineIcon />
    </li>
  );
}
