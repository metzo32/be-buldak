import FilterOptions from "./FilterOptions";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isTrans?: boolean;
  hasSub?: boolean;
  hasFilter?: boolean;
}

export default function Section({
  title,
  children,
  isTrans,
  hasSub,
  hasFilter,
}: SectionProps) {
  return (
    <section
      className={`custom-section ${
        isTrans ? "bg-transparent shadow-none" : "bg-secondary shadow-2xl"
      }`}
    >
      <div className={`flex gap-5 ${hasFilter ? "justify-between items-end": "items-center"}`}>
        <h2 className="text-xl lg:text-3xl 2xl:text-4xl">{title}</h2>
        {hasSub ? <h3 className="text-disabled">n인분 기준</h3> : null}
        {hasFilter ? <FilterOptions /> : null}
      </div>
      {children}
    </section>
  );
}
