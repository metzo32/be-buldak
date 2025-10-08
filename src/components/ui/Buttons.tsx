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
  deactive?: boolean;
  href?: string;
}

export function ButtonStrong({
  text,
  onClick,
  type,
  disabled,
  full,
  deactive,
  href,
}: ButtonProps) {
  return (
    <Button
      type={type}
      variant="contained"
      href={href}
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: full ? "100%" : "fit-content",
        backgroundColor: deactive? "#595959" : "#fe633c",
        color:  deactive? "#A1A1A1" : "#DBDBDB",
        padding: full ? "10px" : null,
        borderRadius: "50px",
        // border: "2px solid",
        "&.Mui-disabled": {
          backgroundColor: "#51494659",
          color: "#514946",
        },
      }}
    >
      {text}
    </Button>
  );
}

export function ButtonOutlined({
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
        padding: full ? "8px" : null,
        borderRadius: "50px",
        border: "2px solid",
        "&.Mui-disabled": {
          border: "2px solid #514946",
          backgroundColor: "#51494633",
          color: "#514946",
        },
      }}
    >
      {text}
    </Button>
  );
}

export function ButtonPlain({
  text,
  onClick,
  type,
  fixedSize = false,
}: ButtonProps) {
  return (
    <Button
      type={type}
      variant="text"
      onClick={onClick}
      color="primary"
      sx={{
        width: fixedSize ? "30px" : "auto",
        color: "#A1A1A1",
        borderRadius: "50px",
        padding: "1px 15px",
      }}
    >
      {text}
    </Button>
  );
}
