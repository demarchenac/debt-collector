import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Layout } from "../../../components/Layout";
import { shouldRedirectOutside } from "../../../utils/shouldRedirect";

const DebtsPage: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Cobra Diario | Deudas</title>
        <meta
          name="description"
          content="Aplicación para gestionar tus cobros."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold text-white">Deudas!</h1>
      <h2 className="mb-4 text-white">
        {sessionData && (
          <span>Sesi&oacute;n iniciada como: {sessionData.user?.name}</span>
        )}
      </h2>
    </>
  );
};

export default DebtsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect } = await shouldRedirectOutside(context);
  if (redirect) {
    return { redirect };
  }

  return { props: {} };
};
