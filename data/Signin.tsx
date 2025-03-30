import { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-in logic here (check if email exists in users, etc.)
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Sign In</h2>
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
  );
};

export default SignIn;
