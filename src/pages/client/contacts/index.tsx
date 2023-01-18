import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgSearchFound } from "react-icons/cg";
import { api } from "../../../utils/api";
import { shouldRedirectOutside } from "../../../utils/shouldRedirect";
import { AddButton } from "../../../components/AddButton";
import { MdGroupAdd } from "react-icons/md";

const ContactsPage: NextPage = () => {
  const { data } = api.contact.getUserContacts.useQuery();

  return (
    <>
      <Head>
        <title>Cobra Diario | Contactos</title>
        <meta
          name="description"
          content="Aplicación para gestionar tus cobros."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mb-2 flex gap-1 text-3xl font-bold text-white">
        <BsFillPeopleFill size={36} /> Contactos
      </h1>
      <div className="m-auto flex flex-col items-center justify-center">
        {data?.contacts.length === 0 ? (
          <h2 className="flex items-center justify-center gap-1 text-white">
            <CgSearchFound size={20} /> No hay contactos, intenta crear uno!
          </h2>
        ) : (
          <></>
        )}
      </div>
      <AddButton
        Icon={MdGroupAdd}
        onClick={() => {
          console.log("hehe");
        }}
      />
    </>
  );
};

export default ContactsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect } = await shouldRedirectOutside(context);
  if (redirect) {
    return { redirect };
  }

  return { props: {} };
};
