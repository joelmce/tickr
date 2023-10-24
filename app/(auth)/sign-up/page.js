import SignUp from "@/components/auth/SignUp";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (data?.session) {
    redirect("/dashboards");
  }

  return (
    <section className="flex items-center justify-center">
      <SignUp />
    </section>
  );
}
