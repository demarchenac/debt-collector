import Image from "next/image";
import { useSession } from "next-auth/react";
import { FaUserCircle } from "react-icons/fa";

export function ProfileImage() {
  const session = useSession();

  return session.status === "authenticated" && session.data.user?.image ? (
    <Image
      alt="Profile picture"
      src={session.data.user?.image}
      className="rounded-full"
      width={40}
      height={40}
      style={{ objectFit: "cover" }}
    />
  ) : (
    <FaUserCircle color="white" size={40} />
  );
}
