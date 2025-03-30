'use client'; // Use double quotes

import { useState, useEffect } from "react"; // Sorted imports
import { redirect } from "next/navigation"; // Correct order of imports
import { auth, getProviders } from "@/auth"; 
import { DASHBOARD_URL } from "@/constants";
import { DemoLogin } from "./DemoLogin";
import { NextAuthLogin } from "./NextAuthLogin";
import styles from "./signin.module.css";

// Assuming the session type is imported or defined somewhere
import { Session } from "next-auth";

// SignIn component
const SignIn = () => {
  const [email, setEmail] = useState("");  // Use double quotes
  const [session, setSession] = useState<Session | null>(null);  
  const [providers, setProviders] = useState<Record<string, string> | undefined>(undefined); 

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await auth(); 
      if (currentSession) {
        setSession(currentSession); 
        redirect(DASHBOARD_URL); 
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
