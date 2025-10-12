import { TextField } from "@mui/material";

interface InputProps {
  type?: "text" | "email" | "password";
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

export default function Input({
  type = "text",
  label,
  value,
  onChange,
  error,
  helperText,
}: InputProps) {
  return (
    <TextField
      type={type}
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText || " "}
      slotProps={{
        formHelperText: {
          sx: {
            minHeight: "14px", 
            marginTop: "8px", 
          },
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "9999px",
          paddingLeft: "20px",
          paddingRight: "20px",

          "& fieldset": {
            borderWidth: "2px",
            borderColor: "var(--color-primaryHover)",
            paddingLeft: "20px",
            paddingRight: "20px",
          },
          "&:hover fieldset": {
            borderColor: "var(--color-primary)",
            paddingLeft: "20px",
            paddingRight: "20px",
          },

          "&.Mui-focused fieldset": {
            borderColor: "var(--color-primary)",
            paddingLeft: "20px",
            paddingRight: "20px",
          },

          "&.Mui-focused legend": {
            padding: "3px",
          },
        },

        "& .MuiOutlinedInput-input": {
          color: "var(--color-text)",
        },

        "& .MuiInputLabel-root": {
          color: "var(--color-disabled)",
          paddingLeft: "20px",
          paddingRight: "20px",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--color-primary)",
          paddingLeft: "20px",
          paddingRight: "20px",
        },
        "& .MuiInputLabel-root.MuiInputLabel-shrink": {
          color: "var(--color-primary)",
        },
        "& legend": {
          padding: "0px",
        },
        "& .MuiInputLabel-shrink ~ .MuiOutlinedInput-root legend": {
          padding: "3px",
        },
      }}
    />
  );
}
