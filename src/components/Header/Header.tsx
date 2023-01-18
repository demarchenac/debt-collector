import { useSession } from "next-auth/react";
import { ProfileImage } from "../Shared";

interface HeaderProps {
  onClick: () => void;
}

export function Header({ onClick }: HeaderProps) {
  const session = useSession();
  if (session.status !== "authenticated") {
    return <></>;
  }

  return (
    <div className="fixed top-0 left-0 z-10 flex h-16 w-screen flex-row-reverse  bg-transparent p-2">
      <div className="max-w-14 h-14 max-h-14 w-14 p-2" onClick={onClick}>
        <ProfileImage />
      </div>
    </div>
  );
}
