"use client";

import { redirect } from "next/navigation"; // `next/navigation` comes first
import { useEffect, useState } from "react"; // `react` is second
import { getProviders, Session, useSession } from "next-auth/react"; // Import from next-auth/react
import { DASHBOARD_URL } from "@/constants";
import { DemoLogin } from "./DemoLogin";
import { NextAuthLogin } from "./NextAuthLogin";
import styles from "./signin.module.css";

const SignIn = () => {
  const [email, setEmail] = useState(""); // Manage email state
  const [session, setSession] = useState<Session | null>(null); // Keep track of session state
  const [providers, setProviders] = useState<Record<string, string> | undefined>(undefined); // Providers state

  // Use `useSession` hook from next-auth/react
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (sessionData) {
      setSession(sessionData); // Set session state
      redirect(DASHBOARD_URL); // Redirect if session exists
    }
  }, [sessionData]); // Dependency on sessionData

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign In Submitted:", email);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      const providersData = await getProviders(); // Get providers data
      setProviders(providersData); // Set providers
    };
    fetchProviders();
  }, []); // Runs once on component mount

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Sign in to your account</h2>
        {providers && providers.credentials ? (
          <DemoLogin />
        ) : (
          <NextAuthLogin providers={providers} />
        )}
        <div style={{ margin: "20px" }}>
          <h2>Or Sign In with your email</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </main>
      <aside className={styles.aside} />
    </div>
  );
};

export default SignIn;
