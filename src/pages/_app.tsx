import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

import { api } from "../utils/api";
import { Header } from "../components/Header";

import "../styles/globals.css";
import { Sidebar } from "../components/Sidebar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [showSidebar, toggleSidebar] = useState(false);

  const openSidebar = () => toggleSidebar(true);
  const closeSidebar = () => toggleSidebar(false);

  console.log({ session, showSidebar });
  return (
    <SessionProvider session={session}>
      <Header onClick={openSidebar} />

      <Sidebar visible={showSidebar} onClose={closeSidebar} />

      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
