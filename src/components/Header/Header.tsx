import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { IoChevronBack } from "react-icons/io5";
import { CircleButton } from "../AddButton";
import { ProfileImage } from "../Shared";

interface HeaderProps {
  onClick: () => void;
}

const formPaths = ["new", "edit"];

export function Header({ onClick }: HeaderProps) {
  const session = useSession();
  const router = useRouter();
  if (session.status !== "authenticated") {
    return <></>;
  }

  const isInForm = formPaths.some((path) => router.pathname.includes(path));
  const goBack = () => {
    void router.back();
  };

  return (
    <div className="fixed top-0 left-0 z-10 flex h-16 w-screen items-center justify-between bg-transparent p-2">
      {isInForm ? (
        <CircleButton Icon={IoChevronBack} onClick={goBack} />
      ) : (
        <span></span>
      )}
      <div className="max-w-14 h-14 max-h-14 w-14 p-2 " onClick={onClick}>
        <ProfileImage />
      </div>
    </div>
  );
}
