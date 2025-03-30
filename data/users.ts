import { User } from "@/types";

/**
 * This array simulates a database consisting of a list of users.
 */
export const users: Omit<User, "color">[] = [
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
