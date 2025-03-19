interface SectionProps {
  title: string;
  children: React.ReactNode;
  isTrans?: boolean;
}

export default function Section({ title, children, isTrans }: SectionProps) {
  return (
    <section
      className={`px-48 py-24 mb-24 flex flex-col gap-12 relative z-1 ${
        isTrans ? "bg-transparent shadow-none" : "bg-secondary shadow-2xl"
      }`}
    >
      <h2 className="text-4xl">{title}</h2>
      {children}
    </section>
  );
}
