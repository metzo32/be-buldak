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
      className={`px-10 py-10 
    mb-24
    flex flex-col gap-15 
    relative z-1
    
    md:px-24 md:py-12 
    2xl:px-48 2xl:py-24 ${
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
