import { useRouter } from "next/router";

function ContactDetailPage() {
  const router = useRouter();
  const { contactPhone } = router.query;

  console.log({ query: router.query });

  return <p>PhoneNumber: {contactPhone}</p>;
}

export default ContactDetailPage;
