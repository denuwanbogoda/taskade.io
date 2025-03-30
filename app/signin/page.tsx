'use client';

import { useEffect, useState } from 'react';
import { getProviders } from 'next-auth/react'; // Make sure to import correctly
import { redirect } from 'next/navigation'; // Move this above react imports
import { DemoLogin } from '@/components/DemoLogin'; // Ensure correct import paths
import NextAuthLogin from '@/components/NextAuthLogin'; // Ensure correct import paths

const SignInPage = () => {
  const [providers, setProviders] = useState<Record<string, string> | undefined>(undefined);

  const fetchProviders = async () => {
    const providersData = await getProviders(); // Get authentication providers
    setProviders(providersData); // Fix the assignment to setProviders
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <div>
      {providers === undefined ? (
        <DemoLogin />
      ) : (
        <NextAuthLogin providers={providers} />
      )}
      {/* Sign-in form */}
      <div style={{ margin: "20px" }}>
        {/* Add your sign-in form here */}
      </div>
    </div>
  );
};

export default SignInPage;
