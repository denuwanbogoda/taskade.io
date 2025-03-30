import { redirect } from "next/navigation"; // `next/navigation` comes first
import { useEffect, useState } from "react"; // `react` is second
import { getProviders, useSession } from "next-auth/react"; // Import only useSession from next-auth/react
import { DASHBOARD_URL } from "@/constants";
import { DemoLogin } from "./DemoLogin";

const SignInPage = () => {
  const [providers, setProviders] = useState<Record<string, string> | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const getAuthProviders = async () => {
      const providers = await getProviders();
      if (providers) {
        setProviders(providers); // Set providers only if they are not null
      }
    };
    getAuthProviders();
  }, []);

  // If session exists, redirect to the dashboard page
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    redirect(DASHBOARD_URL);
  }

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        {providers ? (
          Object.values(providers).map((provider) => (
            <DemoLogin key={provider.name} provider={provider} />
          ))
        ) : (
          <div>No providers available</div>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
