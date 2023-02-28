import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { BsFillPeopleFill } from "react-icons/bs";
import { shouldRedirectOutside } from "../../../utils/shouldRedirect";
import { useRouter } from "next/router";
import { NewContactForm } from "../../../components/Forms/NewContactForm";

const NewContactPage: NextPage = () => {
  const router = useRouter();

  const onAddButtonClicked = () => {
    console.log("loco que");

    void router.push("/client/contacts/new");
  };

  return (
    <>
      <Head>
        <title>Cobra Diario | Nuevo Contacto</title>
        <meta
          name="description"
          content="Aplicación para gestionar tus cobros."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mb-4 flex gap-1 text-3xl font-bold text-white">
        <BsFillPeopleFill size={36} /> Nuevo Contacto
      </h1>
      <div className="flex flex-col  justify-center rounded-md bg-white px-4 py-6">
        <NewContactForm onFormSubmit={onAddButtonClicked} />
      </div>
    </>
  );
};

export default NewContactPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect } = await shouldRedirectOutside(context);
  if (redirect) {
    return { redirect };
  }

  return { props: {} };
};
