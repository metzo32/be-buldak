import { format } from "date-fns/format";
import { parse } from "date-fns";
import { ko } from "date-fns/locale";

export const formatDateToString = (
  dateObj: Date | string | null,
  dateStr = "yyyy-MM-dd"
): string | null => {
  if (!dateObj) return (new Date).toLocaleString();
  return format(new Date(dateObj), dateStr, { locale: ko });
};

export const formatStringToDate = (
  dateStr?: string,
  formatStr = "yyyy-MM-dd"
): Date | null => {
  if (!dateStr) return null;
  return parse(dateStr, formatStr, new Date(), { locale: ko });
};


//  <DatePicker defaultValue={dayjs('2022-04-17')} />