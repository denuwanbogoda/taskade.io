// pages/index.tsx (or wherever you want to place it)
import React, { useState } from "react";

const users = [
  {
    id: "charlie.layne@example.com",
    name: "Charlie Layne",
    avatar: "https://liveblocks.io/avatars/avatar-2.png",
    groupIds: ["product", "engineering", "design"],
  },
  {
    id: "mislav.abha@example.com",
    name: "Mislav Abha",
    avatar: "https://liveblocks.io/avatars/avatar-3.png",
    groupIds: ["engineering"],
  },
  {
    id: "tatum.paolo@example.com",
    name: "Tatum Paolo",
    avatar: "https://liveblocks.io/avatars/avatar-4.png",
    groupIds: ["engineering", "design"],
  },
  {
    id: "anjali.wanda@example.com",
    name: "Anjali Wanda",
    avatar: "https://liveblocks.io/avatars/avatar-5.png",
    groupIds: ["product"],
  },
  {
    id: "emil.joyce@example.com",
    name: "Emil Joyce",
    avatar: "https://liveblocks.io/avatars/avatar-6.png",
    groupIds: ["product", "design"],
  },
];

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSignIn = () => {
    // Check if the user already exists
    const existingUser = users.find((user) => user.id === email);

    if (existingUser) {
      setMessage("User already exists.");
    } else {
      // Add the new user to the list
      const newUser = {
        id: email,
        name: name,
        avatar: "https://liveblocks.io/avatars/avatar-0.png", // Static avatar for now
        groupIds: [], // Default groups or leave empty
      };
      users.push(newUser); // Add the new user to the list
      setMessage(`Welcome, ${name}! Your account has been created.`);
      setEmail(""); // Clear inputs
      setName("");
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <br />
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleSignIn}>Sign In</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignInPage;
