'use client';  // Mark this file as a Client Component

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getProviders, useSession, ClientSafeProvider } from "next-auth/react"; // Import ClientSafeProvider type
import { DASHBOARD_URL } from "@/constants";
import { DemoLogin } from "./DemoLogin";
import { NextAuthLogin } from "./NextAuthLogin";
import styles from "./signin.module.css";

const SignIn = () => {
  const [email, setEmail] = useState(""); // Manage email state
  const [session, setSession] = useState<null | object>(null); // Keep track of session state
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null); // Update type to ClientSafeProvider

  // Use useSession hook from next-auth/react to get session data
  const { data: sessionData } = useSession();

  // Effect hook to update session state when session data changes
  useEffect(() => {
    if (sessionData) {
      setSession(sessionData); // Set session data when available
    }
  }, [sessionData]);

  // If the user is already logged in, redirect to the dashboard
  if (sessionData) {
    redirect(DASHBOARD_URL);
  }

  // Fetch the authentication providers
  useEffect(() => {
    const getAuthProviders = async () => {
      const providers = await getProviders();
      if (providers) {
        setProviders(providers); // Set providers only if they are not null
      }
    };

    getAuthProviders();
  }, []);

  return (
    <div className={styles.container}>
      <h1>Sign In</h1>

      {/* Render Demo Login or NextAuth Login based on available providers */}
      {providers ? (
        <NextAuthLogin providers={providers} />
      ) : (
        <DemoLogin />
      )}

      {/* Form to capture email */}
      <form className={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>

      {/* Show session details if logged in */}
      {session && (
        <div>
          <h3>Welcome back!</h3>
          <p>{JSON.stringify(session)}</p>
        </div>
      )}
    </div>
  );
};

export default SignIn;
