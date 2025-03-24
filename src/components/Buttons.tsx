interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  fixedSize?: boolean;
  isSmall?: boolean;
  disabled?: boolean;
}
export function ButtonStrong({ text, onClick, type, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        disabled ? "opacity-50 bg-disabled hover:bg-disabledHover" : "bg-primary  hover:bg-primaryHover"
      } rounded-full py-1 px-3 lg:py-2 lg:px-6`}
    >
      {text}
    </button>
  );
}

export function ButtonPlain({
  text,
  onClick,
  type,
  fixedSize = false,
  isSmall,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-2 py-1 lg:py-2 lg:px-5 shrink-0 flex justify-center items-center hover:text-textHover ${
        fixedSize ? "w-[30px]" : ""
      }
      ${isSmall ? "text-xl text-disabled" : ""}`}
    >
      {text}
    </button>
  );
}
