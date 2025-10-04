import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  fixedSize?: boolean;
  isSmall?: boolean;
  disabled?: boolean;
  href?: string;
}


export function ButtonStrong({
  text,
  onClick,
  type,
  disabled,
  href,
}: ButtonProps) {


  return (
    <Button
      type={type}
      variant="contained"
      href={href}
      onClick={onClick}
      disabled={disabled}
      color="primary"
      className="text-[16px] lg:text-[20px]"
    >
      {text}
    </Button>

    // <button
    //   type={type}
    //   onClick={onClick}
    //   disabled={disabled}
    //   className={`${
    //     disabled
    //       ? "opacity-50 bg-disabled"
    //       : "bg-primary  hover:bg-primaryHover"
    //   } rounded-full py-0 px-3 lg:px-5 flex-none`}
    // >
    //   {text}
    // </button>
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
      className={`flex-none hover:text-textHover text-[16px] lg:text-[20px] ${
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
