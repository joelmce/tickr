import Link from "next/link";

export default function NavItem({ name, href }) {
  return (
    <Link
      href={href}
      className="no-underline mx-4 hover:bg-neutral-400 rounded-md p-2 transition duration-200"
    >
      <li className="list-none">{name}</li>
    </Link>
  );
}
