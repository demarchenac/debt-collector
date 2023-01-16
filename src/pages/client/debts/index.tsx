import type { GetServerSideProps, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useRef } from "react";
import { shouldRedirectOutside } from "../../../utils/shouldRedirect";

const Debts: NextPage = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { data: sessionData } = useSession();

  const signOutHandler = () => {
    setTimeout(() => {
      btnRef.current?.blur();
    }, 300);

    void signOut();
  };

  return (
    <>
      <Head>
        <title>Cobra Diario | Inicio</title>
        <meta
          name="description"
          content="Aplicación para gestionar tus cobros."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-3xl font-bold text-white">Inicio!</h1>
        <h2 className="mb-4 text-white">
          {sessionData && (
            <span>Sesi&oacute;n iniciada como: {sessionData.user?.name}</span>
          )}
        </h2>
      </main>
    </>
  );
};

export default Debts;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect } = await shouldRedirectOutside(context);
  if (redirect) {
    return { redirect };
  }

  return { props: {} };
};
