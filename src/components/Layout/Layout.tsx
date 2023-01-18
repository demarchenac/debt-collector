export function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <main className="flex min-h-screen flex-col p-4 pt-16">{children}</main>
  );
}
