import { useState, useEffect } from 'react';
import { redirect } from "next/navigation";
import { auth, getProviders } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
import { DemoLogin } from "./DemoLogin";
import { NextAuthLogin } from "./NextAuthLogin";
import styles from "./signin.module.css";

// SignIn component
const SignIn = () => {
  const [email, setEmail] = useState('');  // State for email input
  const [session, setSession] = useState(null);  // State for user session

  useEffect(() => {
    const checkSession = async () => {
      const currentSession = await auth();  // Check if user is already logged in
      if (currentSession) {
        setSession(currentSession);
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

  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const providersData = await getProviders();  // Get authentication providers
      setProviders(providersData);
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
