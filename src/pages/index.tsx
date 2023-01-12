import type { GetServerSideProps } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import { shouldRedirect } from "../utils/shouldRedirect";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cobra Diario</title>
        <meta
          name="description"
          content="Aplicación para gestionar tus cobros."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-3xl font-bold text-white">COBRA DIARIO</h1>
      </main>
    </>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect } = await shouldRedirect(context);
  return { redirect };
};
