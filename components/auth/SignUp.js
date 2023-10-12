"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const supabase = createClientComponentClient();

  const updateEmail = (e) => setEmail(e.target.value);

  const updatePassword = (e) => setPassword(e.target.value);

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: "joelanthony.mac@gmail.com",
      password: "testing",
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  return (
    <>
      <label>
        Email
        <input type="email" onChange={updateEmail} />
      </label>
      <label>
        Password
        <input type="password" onChange={updatePassword} />
      </label>
      <button onClick={handleSignUp}>Sign Up</button>
    </>
  );
}
