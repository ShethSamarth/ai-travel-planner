import { format } from "date-fns"

export const convertToDate = (date: any) => {
  return format(date.toDate(), "dd MMM yyyy")
}
