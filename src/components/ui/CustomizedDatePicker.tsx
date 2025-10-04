import { DateField } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface CustomizedDatePickerProps {
  label: string;
  selectedDate: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}

export default function CustomizedDatePicker({
  label,
  selectedDate,
  onChange,
}: CustomizedDatePickerProps) {
  const today = dayjs(new Date); 
  const hundredYearsAgo = dayjs().subtract(100, "year");

  return (
    <DateField
      label={label}
      defaultValue={today}
      format="YYYY-MM-DD"
      value={selectedDate}
      minDate={hundredYearsAgo}
      maxDate={today}
      onChange={onChange}
      // sx={{
      //   border: "3px solid",
      //   borderColor: "primary.main", 
      //   borderRadius: "16px",
      //   px: 2,
      //   py: 1,
      // }}
      // slotProps={{
      //   textField: {
      //     className: "w-full rounded-2xl", // Tailwind로 구조 잡고
      //     sx: {
      //       border: "3px solid",
      //       borderColor: "primary.main", // MUI 테마 컬러 사용
      //       px: 2,
      //       py: 1,
      //     },
      //   },
      // }}
    />
  );
}
