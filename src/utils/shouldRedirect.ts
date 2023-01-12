import type { GetServerSidePropsContext, Redirect } from "next";
import { getSession } from "next-auth/react";

export const shouldRedirectInside = async (
  context: GetServerSidePropsContext
): Promise<{ redirect: Redirect | null }> => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/client/home",
        permanent: false,
      },
    };
  }

  return { redirect: null };
};

export const shouldRedirectOutside = async (
  context: GetServerSidePropsContext
): Promise<{ redirect: Redirect | null }> => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    };
  }

  return { redirect: null };
};

export const shouldRedirect = async (
  context: GetServerSidePropsContext
): Promise<{ redirect: Redirect }> => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/client/home",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "/auth/sign-in",
      permanent: false,
    },
  };
};
