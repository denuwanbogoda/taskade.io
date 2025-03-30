"use client"; // Corrected quotes
import { redirect } from "next/navigation"; // `next/navigation` first
import { useEffect, useState } from "react"; // `react` comes second
import { auth, getProviders } from "@/auth"; // `next-auth` before `react`
import { DASHBOARD_URL } from "@/constants"; 
import { DemoLogin } from "./DemoLogin";
import { NextAuthLogin } from "./NextAuthLogin";
import styles from "./signin.module.css";
// Make sure `session` is being used or removed if unnecessary
import { Session } from "next-auth"; 
const SignIn = () => {
  const [email, setEmail] = useState(""); // State for email
  const [session, setSession] = useState<Session | null>(null); // If you plan to use session, leave it here
  const [providers, setProviders] = useState<Record<string, string> | undefined>(undefined); // Adjusted type
  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await auth(); // Check user session
      if (currentSession) {
        setSession(currentSession); // Set session
        redirect(DASHBOARD_URL); // Redirect if logged in
      }
    };
    checkSession();
  }, []); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign In Submitted:", email);
  };
  useEffect(() => {
    const fetchProviders = async () => {
      const providersData = await getProviders();
      setProviders(providersData); 
    };
    fetchProviders();
  }, []); 
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
