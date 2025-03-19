
interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
}
export function ButtonStrong({ text, onClick, type }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className="bg-primary rounded-full py-2 px-6 hover:bg-primaryHover">
      {text}
    </button>
  );
}

export function ButtonPlain({ text, onClick, type }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className="py-2 px-5 hover:text-textHover">
      {text}
    </button>
  );
}
