import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button" | undefined;
  fixedSize?: boolean;
  isSmall?: boolean;
  disabled?: boolean;
  full?: boolean;
  href?: string;
}

export function ButtonStrong({
  text,
  onClick,
  type,
  disabled,
  full,
  href,
}: ButtonProps) {
  return (
    <Button
      type={type}
      variant="outlined"
      href={href}
      onClick={onClick}
      disabled={disabled}
      color="primary"
      sx={{
        width: full ? "100%" : "fit-content", 
        borderRadius: "50px",
        border: "2px solid",
        "&.Mui-disabled": {
          backgroundColor: "#514946",
          color: "#A1A1A1",
        },
      }}
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
      className={`flex-none text-disabeldText hover:text-textHover text-[16px] lg:text-[16px] ${
        fixedSize ? "w-[30px]" : "w-auto"
      }`}
    >
      {text}
    </button>
  );
}
