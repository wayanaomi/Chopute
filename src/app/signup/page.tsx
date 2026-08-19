import { redirect } from "next/navigation";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  redirect(`/login?mode=signup${ref ? `&ref=${ref}` : ""}`);
}
