import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { GiMoneyStack } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  {
    path: "/client/debts",
    text: "Los que me deben",
    icon: <GiMoneyStack size={16} />,
  },
  {
    path: "/client/contacts",
    text: "Contactos",
    icon: <BsFillPeopleFill size={16} />,
  },
];

interface SidebarProps {
  visible: boolean;
  onClose: () => void;
}

export function Sidebar({ visible, onClose }: SidebarProps) {
  const session = useSession();

  const router = useRouter();
  const btnRef = useRef<HTMLButtonElement>(null);

  if (session.status !== "authenticated") {
    return <></>;
  }

  console.log({ visible });

  const signOutHandler = () => {
    onClose();

    setTimeout(() => {
      btnRef.current?.blur();
    }, 300);

    void signOut();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sidebar"
          initial={{ x: "-300px", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-300px", opacity: 0 }}
        >
          <div
            onClick={onClose}
            className="fixed top-0 left-0 flex h-screen w-9/12 flex-col rounded-r-3xl border-none bg-slate-900 shadow-sm md:w-4/12"
            tabIndex={-1}
          >
            {/* Heading */}
            <div className="flex items-center justify-between p-4">
              <h2 className="text-xl text-white">Men&uacute;</h2>

              <button
                type="button"
                className="-my-10 box-content h-6 w-6 rounded-none border-none text-white hover:text-white hover:no-underline focus:shadow-none focus:outline-none"
                aria-label="Close"
                onClick={onClose}
              >
                <IoClose size={20} />
              </button>
            </div>

            <div className="mx-auto h-[1px] w-11/12 bg-gray-500 shadow-lg shadow-white"></div>

            {/* Body */}
            <div className="flex flex-col overflow-y-auto p-4 text-slate-500">
              <ul>
                {links.map(({ path, text, icon }) => {
                  const isActive = path === router.pathname;
                  const activeClasses = isActive
                    ? "font-bold text-slate-300"
                    : "";
                  return (
                    <li
                      key={path}
                      className={`flex pb-1 ${activeClasses} transition-all hover:text-slate-100  focus:text-white focus:underline`}
                    >
                      <Link
                        href={path}
                        className="flex items-center justify-center gap-1"
                      >
                        {icon} {text}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-auto flex flex-col overflow-y-auto p-4">
              <button
                ref={btnRef}
                onClick={signOutHandler}
                className="flex border-spacing-2 items-center justify-center gap-1 rounded-md border-2 bg-white px-4 py-2
                transition-transform  hover:border-red-600 hover:bg-gray-200 hover:ring-4 hover:ring-red-200/50
                focus:scale-95  focus:bg-gray-400"
              >
                <GoSignOut size={20} className="fill-red-500 pt-[4px]" /> Cerrar
                sesi&oacute;n
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
