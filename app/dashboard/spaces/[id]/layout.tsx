export default async function SpaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8">
      {children}
    </div>
  );
}