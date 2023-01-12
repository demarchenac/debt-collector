import type { GetServerSideProps } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";
import { useRef } from "react";
import { shouldRedirectInside } from "../../utils/shouldRedirect";

interface SignInProps {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const SignIn: NextPage<SignInProps> = ({ providers }) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const signInHandler = (providerId: string) => {
    setTimeout(() => {
      btnRef.current?.blur();
    }, 300);

    void signIn(providerId, { callbackUrl: `${window.location.origin}` });
  };

  return (
    <>
      <Head>
        <title>Cobra Diario | Iniciar Sesi&oacute;n</title>
        <meta
          name="description"
          content="Aplicación para gestionar tus cobros."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-white">Iniciar Sesi&oacute;n</h1>
        <div>
          {Object.values(providers ?? []).map((provider) => {
            return (
              <button
                key={provider.id}
                ref={btnRef}
                value={provider.id}
                onClick={() => signInHandler(provider.id)}
                className="border-spacing-2 rounded-md border-2 bg-white px-4 py-2 
                transition-transform  hover:border-blue-600 hover:bg-gray-200 hover:ring-4 hover:ring-blue-200/50
                focus:scale-95  focus:bg-gray-400"
              >
                Iniciar Sesi&oacute;n con {provider.name}!
              </button>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { redirect } = await shouldRedirectInside(context);
  if (redirect) {
    return { redirect };
  }

  const providers = await getProviders();
  return {
    props: { providers },
  };
};
