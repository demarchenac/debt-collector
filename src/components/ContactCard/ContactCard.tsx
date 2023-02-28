import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import type { RouterOutputs } from "../../utils/api";
import { CurrencyFormatter } from "../../utils/currencyFormatter";
import { DateFormatter } from "../../utils/dateFormatter";

type Contact = RouterOutputs["contact"]["getUserContacts"]["contacts"][number];

interface ContactCardProps {
  contact: Contact;
}

function ContactCard_NoMemo({ contact }: ContactCardProps) {
  const router = useRouter();
  const { currency, locale } = CurrencyFormatter.format("1234567");

  const handleContactCardClick = () => {
    void router.push(`/client/contacts/${contact.phone}/detail`);
  };

  return (
    <li
      className="grid h-24 w-full grid-cols-[minmax(64px,_1fr)_2fr_minmax(95px,_1fr)] items-center justify-items-center rounded-md bg-slate-50 p-2 shadow-sm shadow-white"
      key={contact.id}
      onClick={handleContactCardClick}
    >
      <div className="h-full w-full p-1.5">
        <Image
          alt={`${contact.firstName} ${contact.lastName}`}
          src={contact.photo}
          className="h-full w-full rounded-full"
          width={64}
          height={64}
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="flex flex-col gap-0.5 place-self-start pl-0.5">
        <h3 className="h-16 text-lg font-bold text-slate-800">{`${contact.firstName} ${contact.lastName}`}</h3>
        <span className="text-xs italic">
          Actualizado el&nbsp;
          {DateFormatter.toString(contact.updatedAt, "YYYY-MM-DD")}
        </span>
      </div>

      <h4 className="text-sm font-bold text-red-600" title={locale}>
        {currency} COP
      </h4>
    </li>
  );
}

export const ContactCard = React.memo(ContactCard_NoMemo);
