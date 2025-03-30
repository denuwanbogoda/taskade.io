'use client';  // Add this at the top to mark the component as a Client Component

import { useState, useEffect } from 'react';
import { redirect } from "next/navigation";
import { auth, getProviders } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
import { DemoLogin } from "./DemoLogin";
import { NextAuthLogin } from "./NextAuthLogin";
import styles from "./signin.module.css";

// Assuming the session type is imported or defined somewhere
import { Session } from "next-auth";  // Example of importing Session type, adjust it based on your setup

// SignIn component
const SignIn = () => {
  const [email, setEmail] = useState('');  // State for email input
  const [session, setSession] = useState<Session | null>(null);  // State for user session, allowing null initially
  const [providers, setProviders] = useState<Record<string, string> | null>(null);  // State for providers, allowing null initially

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await auth();  // Check if user is already logged in
      if (currentSession) {
        setSession(currentSession);  // Set the session if user is logged in
        redirect(DASHBOARD_URL);  // Redirect to dashboard if already logged in
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your email validation logic here (e.g., check if email exists in the user list)
    console.log('Sign In Submitted:', email);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      const providersData = await getProviders();  // Get authentication providers
      setProviders(providersData);  // Set providers data
    };
    fetchProviders();
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Sign in to your account</h2>
        {/* Check if providers exist and render the correct login method */}
        {providers && providers.credentials ? (
          <DemoLogin />
        ) : (
          <NextAuthLogin providers={providers} />
        )}
        {/* Sign-in form */}
        <div style={{ margin: "20px" }}>
          <h2>Or Sign In with your email</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Update email state
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
