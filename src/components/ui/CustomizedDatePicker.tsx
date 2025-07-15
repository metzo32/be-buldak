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
  const today = dayjs(); // Dayjs 객체로 변경
  const hundredYearsAgo = dayjs().subtract(100, "year");

  return (
    <DateField
      label={label}
      defaultValue={dayjs("2022-04-17")}
      format="YYYY-MM-DD"
      value={selectedDate}
      minDate={hundredYearsAgo}
      maxDate={today}
      onChange={onChange}
    />
  );
}
