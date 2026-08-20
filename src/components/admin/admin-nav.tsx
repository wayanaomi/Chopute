import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/searches", label: "Searches" },
  { href: "/admin/payments", label: "Payments" },
];

export function AdminNav() {
  return (
    <nav className="flex flex-wrap gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-lg border border-[#f4771f] bg-white px-4 py-2 text-sm font-semibold text-[#f4771f] transition-all hover:bg-[#f4771f] hover:text-white"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}