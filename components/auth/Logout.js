import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Logout() {
  const supabase = createClientComponentClient();

  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await supabase.auth.signOut();
      }}
    ></button>
  );
}
