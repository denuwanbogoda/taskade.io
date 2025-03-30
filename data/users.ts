import { useState } from "react";
import { LiveblocksProvider, usePresence } from "@liveblocks/client";
import { liveblocksClient } from "./liveblocks"; // Assuming your liveblocks.ts file is in the root

type User = {
  id: string;
  name: string;
  avatar: string;
  groupIds: string[];
};

const users: Omit<User, "color">[] = [
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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Real-time presence for Liveblocks
  const presence = usePresence();

  const handleSignIn = () => {
    // Check if the user already exists
    const existingUser = users.find((user) => user.id === email);

    if (existingUser) {
      setMessage("User already exists.");
    } else {
      // Add the new user to the list
      const newUser: Omit<User, "color"> = {
        id: email,
        name: name,
        avatar: "https://liveblocks.io/avatars/avatar-0.png", // Static avatar for now
        groupIds: [], // Default groups or leave empty
      };
      users.push(newUser); // Add the new user to the list
      setMessage(`Welcome, ${name}! Your account has been created.`);
      setEmail(""); // Clear inputs
      setName("");

      // Optionally, push user to Liveblocks presence
      presence.update({ userId: email, userName: name });
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

const App = () => {
  return (
    <LiveblocksProvider client={liveblocksClient}>
      <SignIn />
      <div>
        <h3>Users List:</h3>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.name} ({user.id})
            </li>
          ))}
        </ul>
      </div>
    </LiveblocksProvider>
  );
};

export default App;
