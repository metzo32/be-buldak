import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  isTrans?: boolean;
  hasSub?: boolean;
  subText?: string;
  option?: boolean;
  optionElement?: ReactNode;
}

export default function Section({
  title,
  children,
  isTrans,
  hasSub,
  subText,
  option,
  optionElement,
}: SectionProps) {
  return (
    <section
      className={`custom-section ${
        isTrans ? "bg-transparent shadow-none" : "bg-secondary shadow-2xl"
      }`}
    >
      <div className={`flex gap-5 ${option ? "justify-between items-end": "items-center"}`}>
        <h2 className="text-xl lg:text-3xl 2xl:text-4xl">{title}</h2>
        {hasSub && <h3 className="text-disabled">{subText}</h3>}
        {option && optionElement}
      </div>
      {children}
    </section>
  );
}
