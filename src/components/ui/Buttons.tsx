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
        disabled
          ? "opacity-50 bg-disabled hover:bg-disabledHover"
          : "bg-primary  hover:bg-primaryHover"
      } rounded-full py-1 px-3 lg:px-5 flex-none`}
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
      className={`flex-none hover:text-textHover ${
        fixedSize ? "w-[30px]" : "w-auto"
      }
      ${
        isSmall
          ? "text-disabled px-0 py-1 lg:py-2"
          : "px-2 py-1 lg:py-2 lg:px-5"
      }`}
    >
      {text}
    </button>
  );
}
