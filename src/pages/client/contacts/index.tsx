import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { BsFillPeopleFill } from "react-icons/bs";
import { CgSearchFound } from "react-icons/cg";
import { MdGroupAdd } from "react-icons/md";
import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import { shouldRedirectOutside } from "../../../utils/shouldRedirect";
import { CircleButton } from "../../../components/CircleButton";
import { ContactCard } from "../../../components/ContactCard";
import React from "react";

const ContactsPage: NextPage = () => {
  const { data } = api.contact.getUserContacts.useQuery();

  const router = useRouter();

  const isEmpty = data?.contacts.length === 0;
  const centerMessage = isEmpty ? "m-auto" : "";

  const onAddButtonClicked = () => {
    void router.push("/client/contacts/new");
  };

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
      <div
        className={`flex flex-col items-center justify-center ${centerMessage}`}
      >
        {isEmpty ? (
          <h2 className="flex items-center justify-center gap-1 text-white">
            <CgSearchFound size={20} /> No hay contactos, intenta crear uno!
          </h2>
        ) : (
          <ul className="flex flex-col gap-2 py-4">
            {data?.contacts.map((contact) => (
              <ContactCard contact={contact} key={contact.id} />
            ))}
          </ul>
        )}
      </div>
      <CircleButton
        Icon={MdGroupAdd}
        onClick={onAddButtonClicked}
        variant="add"
      />
    </>
  );
};

const MemoizedContactsPage = React.memo(ContactsPage);

export default MemoizedContactsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect } = await shouldRedirectOutside(context);
  if (redirect) {
    return { redirect };
  }

  return { props: {} };
};
